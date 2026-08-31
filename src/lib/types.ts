/* ── Modelo de contenido de Curiomundo ─────────────────────────────
   Todo el sistema está tipado para escalar a 10.000+ curiosidades
   sin tocar la arquitectura. */

export type IconoId =
  | 'historia' | 'ciencia' | 'espacio' | 'misterios' | 'animales'
  | 'geografia' | 'tecnologia' | 'cuerpo' | 'inventos' | 'guerras'
  | 'personajes' | 'civilizaciones' | 'mar' | 'volcanes' | 'universo'
  | 'psicologia';

export interface Categoria {
  id: IconoId;
  nombre: string;
  slug: string;
  descripcion: string;
  color: string;
}

export type Bloque =
  | { tipo: 'p'; texto: string }
  | { tipo: 'h2'; texto: string }
  | { tipo: 'lista'; items: string[] }
  | { tipo: 'cita'; texto: string; autor?: string }
  | { tipo: 'dato'; titulo: string; items: { k: string; v: string }[] }
  | { tipo: 'tabla'; cabeceras: string[]; filas: string[][] };

export interface Entidades {
  personas?: string[];
  lugares?: string[];
  epocas?: string[];
}

export interface Fuente {
  titulo: string;
  url: string;
}

export interface Curiosidad {
  slug: string;
  titulo: string;
  subtitulo: string;
  /** meta description (≤ 160 caracteres recomendado) */
  descripcion: string;
  /** resumen visible en tarjetas */
  excerpt: string;
  categoria: IconoId;
  tags: string[];
  /** URL de imagen; si falta, se genera una portada SVG procedural */
  imagen?: string;
  imageAlt: string;
  pubDate: string;
  updatedDate?: string;
  autor: string;
  destacada?: boolean;
  /** peso editorial para «Las más sorprendentes» */
  sorpresa?: number;
  entidades: Entidades;
  fuentes?: Fuente[];
  bloques: Bloque[];
}

export interface Pregunta {
  texto: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
}

export interface Quiz {
  slug: string;
  titulo: string;
  descripcion: string;
  categoria: IconoId;
  dificultad: 'Fácil' | 'Media' | 'Difícil';
  preguntas: Pregunta[];
}

export interface DatoTicker {
  texto: string;
  slug?: string;
}

export interface ResultadoBusqueda {
  curiosidad: Curiosidad;
  score: number;
  frag: { antes: string; medio: string; despues: string } | null;
}
