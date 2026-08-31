import { CURIOSIDADES } from '../data/curiosidades';
import { CATEGORIAS, getCategoria } from '../data/categorias';
import type { Curiosidad, ResultadoBusqueda } from './types';

/* ── Utilidades de texto ─────────────────────────────────────────── */

const normChar = (c: string) => {
  const n = c.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return (n || c).toLowerCase();
};

/** Minúsculas sin acentos, conservando la longitud (los índices siguen alineados). */
export const normalizar = (s: string) => Array.from(s).map(normChar).join('');

export const slugify = (s: string) =>
  normalizar(s).replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const tagSlug = slugify;

export function formatoFecha(iso: string): string {
  const f = new Date(iso + 'T12:00:00');
  return f.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function textoPlano(c: Curiosidad): string {
  return c.bloques
    .map((b) => {
      switch (b.tipo) {
        case 'p': case 'h2': case 'cita': return b.texto;
        case 'lista': return b.items.join(' ');
        case 'dato': return b.items.map((i) => `${i.k} ${i.v}`).join(' ');
        case 'tabla': return b.filas.map((f) => f.join(' ')).join(' ');
      }
    })
    .join(' ');
}

export function tiempoLectura(c: Curiosidad): number {
  const palabras = (c.excerpt + ' ' + textoPlano(c)).split(/\s+/).length;
  return Math.max(2, Math.round(palabras / 210));
}

/* ── Índices y consultas ─────────────────────────────────────────── */

export const porSlug = new Map<string, Curiosidad>(CURIOSIDADES.map((c) => [c.slug, c]));

export function porCategoria(id: string): Curiosidad[] {
  return CURIOSIDADES.filter((c) => c.categoria === id).sort(
    (a, b) => b.pubDate.localeCompare(a.pubDate),
  );
}

export function recientes(n: number): Curiosidad[] {
  return [...CURIOSIDADES].sort((a, b) => b.pubDate.localeCompare(a.pubDate)).slice(0, n);
}

export function destacadas(n: number): Curiosidad[] {
  return [...CURIOSIDADES]
    .filter((c) => c.destacada)
    .sort((a, b) => (b.sorpresa ?? 0) - (a.sorpresa ?? 0))
    .slice(0, n);
}

export function etiquetasConConteo(): { etiqueta: string; slug: string; total: number }[] {
  const mapa = new Map<string, number>();
  for (const c of CURIOSIDADES) for (const t of c.tags) mapa.set(t, (mapa.get(t) ?? 0) + 1);
  return [...mapa.entries()]
    .map(([etiqueta, total]) => ({ etiqueta, slug: tagSlug(etiqueta), total }))
    .sort((a, b) => b.total - a.total || a.etiqueta.localeCompare(b.etiqueta));
}

export function curiosidadesPorTag(slug: string): Curiosidad[] {
  return CURIOSIDADES.filter((c) => c.tags.some((t) => tagSlug(t) === slug)).sort(
    (a, b) => b.pubDate.localeCompare(a.pubDate),
  );
}

export interface EntidadConteo { nombre: string; slug: string; total: number }

export function entidadesAgrupadas(): { personas: EntidadConteo[]; lugares: EntidadConteo[]; epocas: EntidadConteo[] } {
  const contar = (lista: string[] | undefined, mapa: Map<string, number>) => {
    for (const e of lista ?? []) mapa.set(e, (mapa.get(e) ?? 0) + 1);
  };
  const personas = new Map<string, number>();
  const lugares = new Map<string, number>();
  const epocas = new Map<string, number>();
  for (const c of CURIOSIDADES) {
    contar(c.entidades.personas, personas);
    contar(c.entidades.lugares, lugares);
    contar(c.entidades.epocas, epocas);
  }
  const convertir = (m: Map<string, number>): EntidadConteo[] =>
    [...m.entries()]
      .map(([nombre, total]) => ({ nombre, slug: slugify(nombre), total }))
      .sort((a, b) => b.total - a.total);
  return { personas: convertir(personas), lugares: convertir(lugares), epocas: convertir(epocas) };
}

export function conteoCategoria(id: string): number {
  return CURIOSIDADES.filter((c) => c.categoria === id).length;
}

/* ── Buscador ────────────────────────────────────────────────────── */

type MapaTokens = Map<string, Map<string, number>>;
let indice: MapaTokens | null = null;

function construirIndice(): MapaTokens {
  const mapa: MapaTokens = new Map();
  for (const c of CURIOSIDADES) {
    const campos: { texto: string; peso: number }[] = [
      { texto: c.titulo, peso: 6 },
      { texto: c.tags.join(' '), peso: 4 },
      { texto: getCategoria(c.categoria).nombre, peso: 3 },
      {
        texto: [
          ...(c.entidades.personas ?? []),
          ...(c.entidades.lugares ?? []),
          ...(c.entidades.epocas ?? []),
        ].join(' '),
        peso: 3,
      },
      { texto: c.subtitulo, peso: 2 },
      { texto: c.excerpt, peso: 2 },
      { texto: textoPlano(c), peso: 1 },
    ];
    for (const { texto, peso } of campos) {
      for (const token of normalizar(texto).split(/[^a-z0-9]+/).filter((t) => t.length > 1)) {
        if (!mapa.has(token)) mapa.set(token, new Map());
        const docs = mapa.get(token)!;
        docs.set(c.slug, Math.max(docs.get(c.slug) ?? 0, peso));
      }
    }
  }
  return mapa;
}

export function buscar(consulta: string, limite = 24): ResultadoBusqueda[] {
  if (!indice) indice = construirIndice();
  const tokens = normalizar(consulta).split(/[^a-z0-9]+/).filter((t) => t.length > 1);
  if (tokens.length === 0) return [];

  const porToken = tokens.map((t) => {
    const parcial = new Map<string, number>();
    for (const [token, docs] of indice!) {
      const coincide = token === t || token.startsWith(t) || (t.length >= 4 && token.includes(t));
      if (coincide) {
        for (const [slug, peso] of docs) {
          parcial.set(slug, Math.max(parcial.get(slug) ?? 0, peso * (token === t ? 1 : 0.7)));
        }
      }
    }
    return parcial;
  });

  // AND: un resultado debe contener todos los términos
  let combinado = porToken[0];
  for (let i = 1; i < porToken.length; i++) {
    combinado = new Map(
      [...combinado]
        .filter(([slug]) => porToken[i].has(slug))
        .map(([slug, peso]) => [slug, peso + (porToken[i].get(slug) ?? 0)]),
    );
  }

  return [...combinado.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limite)
    .map(([slug, score]) => {
      const curiosidad = porSlug.get(slug)!;
      return { curiosidad, score, frag: fragmento(curiosidad, tokens) };
    });
}

function fragmento(c: Curiosidad, tokens: string[]): ResultadoBusqueda['frag'] {
  const fuentes = [c.excerpt, textoPlano(c)];
  for (const f of fuentes) {
    const nf = normalizar(f);
    for (const t of tokens) {
      const i = nf.indexOf(t);
      if (i >= 0) {
        const ini = Math.max(0, i - 55);
        const fin = Math.min(f.length, i + t.length + 95);
        return {
          antes: (ini > 0 ? '…' : '') + f.slice(ini, i),
          medio: f.slice(i, i + t.length),
          despues: f.slice(i + t.length, fin) + (fin < f.length ? '…' : ''),
        };
      }
    }
  }
  return null;
}

/* ── Curiomotor: conexiones entre curiosidades ───────────────────── */

function hashDeterminista(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Artículos relacionados por categoría, etiquetas y entidades. */
export function relacionadas(slug: string, n = 6): Curiosidad[] {
  const origen = porSlug.get(slug);
  if (!origen) return [];
  const entidadesOrigen = new Set([
    ...(origen.entidades.personas ?? []),
    ...(origen.entidades.lugares ?? []),
    ...(origen.entidades.epocas ?? []),
  ]);
  const puntuadas = CURIOSIDADES.filter((c) => c.slug !== slug)
    .map((c) => {
      let score = 0;
      if (c.categoria === origen.categoria) score += 3;
      score += c.tags.filter((t) => origen.tags.includes(t)).length * 2;
      const ents = [
        ...(c.entidades.personas ?? []),
        ...(c.entidades.lugares ?? []),
        ...(c.entidades.epocas ?? []),
      ];
      score += ents.filter((e) => entidadesOrigen.has(e)).length * 2;
      // orden determinista pero variado por par de artículos
      const tie = (hashDeterminista(slug + c.slug) % 1000) / 1000;
      return { c, score: score + tie };
    })
    .sort((a, b) => b.score - a.score);
  return puntuadas.slice(0, n).map((p) => p.c);
}

/** Curiosidad del día: determinista por fecha (todos ven la misma cada día). */
export function curiosidadDelDia(): Curiosidad {
  const hoy = new Date();
  const clave = hoy.getFullYear() * 10000 + (hoy.getMonth() + 1) * 100 + hoy.getDate();
  return CURIOSIDADES[clave % CURIOSIDADES.length];
}

/** Selección aleatoria real, evitando repetir la última mostrada. */
export function aleatoria(excluir: string[] = []): Curiosidad {
  let ultima = '';
  try {
    ultima = sessionStorage.getItem('cm:ultima') ?? '';
  } catch { /* sin almacenamiento */ }
  const prohibidas = new Set([...excluir, ultima]);
  let pool = CURIOSIDADES.filter((c) => !prohibidas.has(c.slug));
  if (pool.length === 0) pool = CURIOSIDADES;
  const eleccion = pool[Math.floor(Math.random() * pool.length)];
  try {
    sessionStorage.setItem('cm:ultima', eleccion.slug);
  } catch { /* sin almacenamiento */ }
  return eleccion;
}

/** Semilla para portadas procedurales deterministas. */
export function semillaDe(slug: string): number {
  return hashDeterminista(slug);
}

export const TOTAL_CURIOSIDADES = CURIOSIDADES.length;
export const TOTAL_CATEGORIAS = CATEGORIAS.length;
export const TOTAL_ETIQUETAS = etiquetasConConteo().length;
