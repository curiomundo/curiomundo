import { useMemo, useState } from 'react';
import { CATEGORIAS } from '../data/categorias';
import { recientes, conteoCategoria } from '../lib/content';
import { aplicarMeta, jsonldBase, OG_POR_DEFECTO } from '../lib/meta';
import { CuriosidadCard } from '../components/CuriosidadCard';
import { Icono } from '../components/Icons';
import { Reveal } from '../components/Reveal';
import type { IconoId } from '../lib/types';

const LOTE = 9;

export function Explorar() {
  const [filtro, setFiltro] = useState<'todas' | IconoId>('todas');
  const [visibles, setVisibles] = useState(LOTE);

  const todas = useMemo(() => recientes(10_000), []);
  const filtradas = useMemo(
    () => (filtro === 'todas' ? todas : todas.filter((c) => c.categoria === filtro)),
    [todas, filtro],
  );
  const mostradas = filtradas.slice(0, visibles);

  useMemo(() => {
    aplicarMeta({
      titulo: 'Explorar todas las curiosidades — Curiomundo',
      descripcion:
        'El feed completo de curiosidades de Curiomundo: historia, ciencia, espacio, misterios y más. Filtra por categoría y sigue descubriendo.',
      ruta: 'explorar',
      imagen: OG_POR_DEFECTO,
      jsonld: [
        ...jsonldBase(),
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Explorar curiosidades',
          inLanguage: 'es-ES',
        },
      ],
    });
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
      <Reveal>
        <header className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cobalt-b">El feed infinito</p>
          <h1 className="mt-2 font-display text-4xl font-black tracking-tight sm:text-5xl">
            Explorar todo
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-sub sm:text-base">
            Todas las curiosidades del archivo, de la más nueva a la más antigua. Pensado para
            deslizarse sin mirar el reloj.
          </p>
        </header>
      </Reveal>

      {/* Filtros por categoría */}
      <div className="scroll-row -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Filtrar por categoría">
        <button
          type="button"
          role="tab"
          aria-selected={filtro === 'todas'}
          onClick={() => { setFiltro('todas'); setVisibles(LOTE); }}
          className={`chip-filtro ${filtro === 'todas' ? 'activo' : ''}`}
        >
          Todas · {todas.length}
        </button>
        {CATEGORIAS.filter((c) => conteoCategoria(c.id) > 0).map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={filtro === cat.id}
            onClick={() => { setFiltro(cat.id); setVisibles(LOTE); }}
            className={`chip-filtro ${filtro === cat.id ? 'activo' : ''}`}
            style={filtro === cat.id ? { background: cat.color, borderColor: cat.color } : undefined}
          >
            <Icono nombre={cat.id} className="h-3.5 w-3.5" />
            {cat.nombre}
          </button>
        ))}
      </div>

      <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-faint" aria-live="polite">
        Mostrando {mostradas.length} de {filtradas.length}
      </p>

      <div className="mt-5 flex flex-col gap-6">
        {mostradas.map((c, i) => (
          <Reveal key={c.slug} delay={Math.min((i % LOTE) * 50, 250)}>
            <CuriosidadCard c={c} variante="horizontal" />
          </Reveal>
        ))}
      </div>

      {filtradas.length === 0 && (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-line bg-card px-6 py-16 text-center">
          <Icono nombre="misterios" className="h-10 w-10 text-faint" />
          <p className="mt-4 font-display text-xl font-bold">Nada por aquí todavía</p>
          <p className="mt-2 max-w-sm text-sm text-sub">
            Esta combinación aún no tiene curiosidades. Prueba otra categoría o deja que el azar decida.
          </p>
        </div>
      )}

      <div className="mt-10 flex justify-center">
        {visibles < filtradas.length ? (
          <button type="button" onClick={() => setVisibles((v) => v + LOTE)} className="btn btn-primary h-13 !px-8 text-base">
            Cargar más curiosidades
            <Icono nombre="flecha" className="h-4 w-4 rotate-90" />
          </button>
        ) : (
          filtradas.length > 0 && (
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-faint">
              <Icono nombre="infinito" className="h-4 w-4 text-gold" />
              Has llegado al final… de momento
            </p>
          )
        )}
      </div>
    </div>
  );
}
