import type { Categoria, IconoId } from '../lib/types';

/**
 * Añadir una categoría = añadir una entrada aquí.
 * Las páginas /categoria/:slug se generan automáticamente.
 */
export const CATEGORIAS: Categoria[] = [
  { id: 'historia', nombre: 'Historia', slug: 'historia', color: '#b06f3a', descripcion: 'Fechas que no cuadran, imperios que caen y detalles que los libros olvidaron.' },
  { id: 'ciencia', nombre: 'Ciencia', slug: 'ciencia', color: '#2b7f8e', descripcion: 'El mundo explicado con rigor: física, química y biología con capacidad de asombro.' },
  { id: 'espacio', nombre: 'Espacio', slug: 'espacio', color: '#3d52c7', descripcion: 'Agujeros negros, planetas imposibles y la escala absurda del cosmos.' },
  { id: 'misterios', nombre: 'Misterios', slug: 'misterios', color: '#6c4fa1', descripcion: 'Enigmas reales, sin resolver y documentados. Sin teorías conspiranoicas.' },
  { id: 'animales', nombre: 'Animales', slug: 'animales', color: '#3f8f5f', descripcion: 'Biologías tan extrañas que parecen diseñadas por un guionista con prisa.' },
  { id: 'geografia', nombre: 'Geografía', slug: 'geografia', color: '#4e7a3a', descripcion: 'Lugares que existen aunque cueste creerlo: mapas, fenómenos y fronteras raras.' },
  { id: 'tecnologia', nombre: 'Tecnología', slug: 'tecnologia', color: '#4a6fa5', descripcion: 'Los orígenes ocultos de las cosas que usamos cada día.' },
  { id: 'cuerpo', nombre: 'Cuerpo humano', slug: 'cuerpo-humano', color: '#c24d5c', descripcion: 'La máquina más rara que existe es la que llevas encima.' },
  { id: 'inventos', nombre: 'Inventos', slug: 'inventos', color: '#b0762f', descripcion: 'Objetos con historias más sorprendentes que su funcionamiento.' },
  { id: 'guerras', nombre: 'Guerras', slug: 'guerras', color: '#8a4a3f', descripcion: 'Conflictos contados a través de sus detalles más insólitos.' },
  { id: 'personajes', nombre: 'Personajes históricos', slug: 'personajes-historicos', color: '#946846', descripcion: 'Vidas reales que suenan a guion de película.' },
  { id: 'civilizaciones', nombre: 'Civilizaciones', slug: 'civilizaciones', color: '#a8842c', descripcion: 'Culturas que construyeron lo imposible con lo que tenían a mano.' },
  { id: 'mar', nombre: 'Mar', slug: 'mar', color: '#2f6d9e', descripcion: 'El planeta azul es en realidad un planeta océano. Aquí está la prueba.' },
  { id: 'volcanes', nombre: 'Volcanes', slug: 'volcanes', color: '#c05a36', descripcion: 'La Tierra por dentro: lava, fuego y montañas que respiran.' },
  { id: 'universo', nombre: 'Universo', slug: 'universo', color: '#454b9e', descripcion: 'Fenómenos cósmicos que desafían la intuición.' },
  { id: 'psicologia', nombre: 'Psicología', slug: 'psicologia', color: '#7a5c9e', descripcion: 'Tu cerebro te miente con cariño. Aquí lo pillamos en pleno engaño.' },
];

export const categoriasPorId = new Map<string, Categoria>(CATEGORIAS.map((c) => [c.id, c]));
export const categoriasPorSlug = new Map<string, Categoria>(CATEGORIAS.map((c) => [c.slug, c]));

export function getCategoria(id: IconoId): Categoria {
  return categoriasPorId.get(id) ?? CATEGORIAS[0];
}
