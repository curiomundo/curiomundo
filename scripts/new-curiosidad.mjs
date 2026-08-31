#!/usr/bin/env node
/**
 * Curiomundo · Generador de plantilla para nuevas curiosidades.
 *
 * Uso:
 *   node scripts/new-curiosidad.mjs "Título de la curiosidad" ciencia
 *
 * Crea un archivo con el objeto tipado listo para pegar en el array
 * CURIOSIDADES de src/data/curiosidades.ts (la URL, el buscador y los
 * relacionados se generan automáticamente al añadirlo).
 */
import { writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const CATEGORIAS = [
  'historia', 'ciencia', 'espacio', 'misterios', 'animales', 'geografia',
  'tecnologia', 'cuerpo', 'inventos', 'guerras', 'personajes',
  'civilizaciones', 'mar', 'volcanes', 'universo', 'psicologia',
];

const [titulo, categoria] = process.argv.slice(2);

if (!titulo || !categoria) {
  console.error('\n  Uso:  node scripts/new-curiosidad.mjs "Título de la curiosidad" categoria');
  console.error(`  Categorías válidas: ${CATEGORIAS.join(', ')}\n`);
  process.exit(1);
}

if (!CATEGORIAS.includes(categoria)) {
  console.error(`\n  ✗ La categoría «${categoria}» no existe.`);
  console.error(`  Válidas: ${CATEGORIAS.join(', ')}\n`);
  process.exit(1);
}

const slug = titulo
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

const destino = resolve(raiz, 'src', 'data', 'nueva-curiosidad-' + slug + '.ts');

if (existsSync(destino)) {
  console.error(`\n  ✗ Ya existe: ${destino}\n`);
  process.exit(1);
}

const hoy = new Date().toISOString().slice(0, 10);

const plantilla = `import type { Curiosidad } from '../lib/types';

/**
 * NUEVA CURIOSIDAD — plantilla generada automáticamente.
 *
 * 1) Completa todos los campos (borra este comentario).
 * 2) Copia el objeto dentro del array CURIOSIDADES en src/data/curiosidades.ts.
 * 3) Elimina este archivo.
 * 4) Comprueba que no exista ya un slug o título parecido (evita duplicados).
 */
export const nuevaCuriosidad: Curiosidad = {
  slug: '${slug}',
  titulo: ${JSON.stringify(titulo)},
  subtitulo: 'Subtítulo con gancho (una frase).',
  descripcion: 'Meta description: ≤ 160 caracteres, con la curiosidad resumida.',
  excerpt: 'Resumen para tarjetas: 1-2 frases que dejen con ganas de más.',
  categoria: '${categoria}',
  tags: ['tag-1', 'tag-2'],
  // imagen: 'URL o ruta de la imagen (opcional; sin imagen se genera portada SVG)',
  imageAlt: 'Descripción de la imagen para lectores de pantalla.',
  pubDate: '${hoy}',
  autor: 'Redacción Curiomundo',
  destacada: false,
  sorpresa: 70,
  entidades: {
    personas: [],
    lugares: [],
    epocas: [],
  },
  fuentes: [
    // { titulo: 'Fuente real y verificable', url: 'https://…' },
  ],
  bloques: [
    { tipo: 'p', texto: 'Primer párrafo: el dato que vuela la cabeza, sin rodeos.' },
    { tipo: 'h2', texto: 'Primer subtítulo' },
    { tipo: 'p', texto: 'Desarrollo con contexto.' },
    { tipo: 'dato', titulo: 'El dato en cifras', items: [
      { k: 'Concepto', v: 'Valor' },
      { k: 'Concepto', v: 'Valor' },
    ]},
    { tipo: 'lista', items: ['Dato extra 1', 'Dato extra 2', 'Dato extra 3'] },
    { tipo: 'cita', texto: 'Cita real de una fuente real.', autor: 'Autor, cargo' },
  ],
};
`;

writeFileSync(destino, plantilla, 'utf8');
console.log('\n  ✓ Plantilla creada:');
console.log('    ' + destino);
console.log('\n  Siguiente paso: completa el archivo y pega el objeto en');
console.log('  src/data/curiosidades.ts (array CURIOSIDADES).\n');
