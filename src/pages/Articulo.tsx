import { useMemo, useState } from 'react';
import type { Bloque, Curiosidad } from '../lib/types';
import { CURIOSIDADES } from '../data/curiosidades';
import { getCategoria } from '../data/categorias';
import {
  aleatoria, formatoFecha, porCategoria, relacionadas, tagSlug, tiempoLectura,
} from '../lib/content';
import { aplicarMeta, jsonldBase, jsonldBreadcrumb, OG_POR_DEFECTO } from '../lib/meta';
import { Link, urlAbsoluta } from '../lib/router';
import { useProgreso } from '../lib/hooks';
import { Cover } from '../components/Cover';
import { ChipCategoria, CuriosidadCard } from '../components/CuriosidadCard';
import { Icono } from '../components/Icons';
import { BotonesCompartir, BotonFavorito } from '../components/Bits';
import { Reveal } from '../components/Reveal';
import { PaginaNoEncontrada } from './Estaticas';

export function Articulo({ slug }: { slug: string }) {
  const c = CURIOSIDADES.find((x) => x.slug === slug);
  const progreso = useProgreso();
  /* Se calcula una sola vez por montaje: no debe cambiar mientras se lee. */
  const [siguiente, setSiguiente] = useState<Curiosidad | null>(() =>
    c ? aleatoria([c.slug]) : null,
  );

  const relacionadasMemo = useMemo(() => (c ? relacionadas(c.slug, 3) : []), [c]);
  const mismaCategoria = useMemo(
    () => (c ? porCategoria(c.categoria).filter((x) => x.slug !== c.slug).slice(0, 3) : []),
    [c],
  );

  useMemo(() => {
    if (!c) return;
    const cat = getCategoria(c.categoria);
    aplicarMeta({
      titulo: `${c.titulo} — Curiomundo`,
      descripcion: c.descripcion,
      ruta: `curiosidad/${c.slug}`,
      imagen: c.imagen ?? OG_POR_DEFECTO,
      tipo: 'article',
      jsonld: [
        ...jsonldBase(),
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: c.titulo,
          description: c.descripcion,
          image: c.imagen ?? OG_POR_DEFECTO,
          datePublished: c.pubDate,
          dateModified: c.updatedDate ?? c.pubDate,
          inLanguage: 'es-ES',
          author: { '@type': 'Organization', name: c.autor },
          publisher: { '@type': 'Organization', name: 'Curiomundo' },
          articleSection: cat.nombre,
          keywords: c.tags.join(', '),
        },
        jsonldBreadcrumb([
          { nombre: 'Inicio', ruta: '' },
          { nombre: cat.nombre, ruta: `categoria/${cat.slug}` },
          { nombre: c.titulo, ruta: `curiosidad/${c.slug}` },
        ]),
      ],
    });
  }, [c]);

  if (!c) return <PaginaNoEncontrada />;
  const cat = getCategoria(c.categoria);
  const siguienteCuriosidad = siguiente ?? c;

  const nuevaSorpresa = () => setSiguiente(aleatoria([c.slug, siguienteCuriosidad.slug]));

  const entidades: { grupo: string; lista: string[] }[] = [
    { grupo: 'Personas', lista: c.entidades.personas ?? [] },
    { grupo: 'Lugares', lista: c.entidades.lugares ?? [] },
    { grupo: 'Épocas', lista: c.entidades.epocas ?? [] },
  ].filter((e) => e.lista.length > 0);

  return (
    <>
      {/* Barra de progreso de lectura */}
      <div className="fixed left-0 top-16 z-40 h-[3px] w-full bg-transparent" aria-hidden="true">
        <div className="h-full bg-cobalt transition-[width] duration-150" style={{ width: `${progreso * 100}%` }} />
      </div>

      <article className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        {/* Breadcrumb */}
        <nav aria-label="Miga de pan" className="flex flex-wrap items-center gap-2 font-mono text-xs text-faint">
          <Link to="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-cobalt-b">
            <Icono nombre="inicio" className="h-3.5 w-3.5" />
            Inicio
          </Link>
          <span aria-hidden="true">/</span>
          <Link to={`/categoria/${cat.slug}`} className="transition-colors hover:text-cobalt-b">
            {cat.nombre}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="max-w-[46vw] truncate text-sub sm:max-w-md" aria-current="page">
            {c.titulo}
          </span>
        </nav>

        <div className="mx-auto mt-8 max-w-3xl">
          <ChipCategoria categoria={c.categoria} />
          <h1 className="mt-4 font-display text-3xl font-black leading-[1.08] tracking-tight sm:text-[2.6rem]">
            {c.titulo}
          </h1>
          <p className="mt-4 font-display text-lg italic leading-relaxed text-sub sm:text-xl">
            {c.subtitulo}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-line py-4 text-sm text-sub">
            <span className="inline-flex items-center gap-2">
              <Icono nombre="autor" className="h-4 w-4 text-faint" />
              {c.autor}
            </span>
            <span className="inline-flex items-center gap-2">
              <Icono nombre="calendario" className="h-4 w-4 text-faint" />
              <time dateTime={c.pubDate}>{formatoFecha(c.pubDate)}</time>
            </span>
            {c.updatedDate && (
              <span className="inline-flex items-center gap-2 text-xs text-faint">
                Actualizado: <time dateTime={c.updatedDate}>{formatoFecha(c.updatedDate)}</time>
              </span>
            )}
            <span className="inline-flex items-center gap-2">
              <Icono nombre="reloj" className="h-4 w-4 text-faint" />
              {tiempoLectura(c)} min de lectura
            </span>
            <span className="ml-auto flex items-center gap-2.5">
              <BotonFavorito slug={c.slug} />
              <BotonesCompartir titulo={c.titulo} ruta={`curiosidad/${c.slug}`} />
            </span>
          </div>
        </div>

        {/* Imagen principal */}
        <figure className="mx-auto mt-8 max-w-5xl">
          <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-line shadow-lg">
            <Cover c={c} eager />
          </div>
          <figcaption className="mt-3 text-center text-xs text-faint">{c.imageAlt}</figcaption>
        </figure>

        {/* Cuerpo */}
        <div className="mx-auto mt-10 max-w-3xl">
          {c.bloques.map((b, i) => (
            <RenderBloque key={i} b={b} />
          ))}

          {/* Etiquetas */}
          <div className="mt-12 border-t border-line pt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Etiquetas</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.tags.map((t) => (
                <Link
                  key={t}
                  to={`/tag/${tagSlug(t)}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3.5 py-1.5 text-sm text-sub transition-all hover:-translate-y-0.5 hover:border-cobalt hover:text-cobalt-b"
                >
                  <Icono nombre="etiqueta" className="h-3.5 w-3.5" />
                  {t}
                </Link>
              ))}
            </div>
          </div>

          {/* Entidades */}
          {entidades.length > 0 && (
            <div className="mt-8 rounded-xl border border-line bg-card p-6">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                <Icono nombre="infinito" className="h-4 w-4 text-cobalt-b" />
                El Curiomotor · sigue el hilo
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {entidades.map((e) => (
                  <div key={e.grupo} className="flex flex-wrap items-center gap-2">
                    <span className="w-20 shrink-0 text-xs font-semibold uppercase tracking-wider text-faint">
                      {e.grupo}
                    </span>
                    {e.lista.map((nombre) => (
                      <Link
                        key={nombre}
                        to={`/buscar?q=${encodeURIComponent(nombre)}`}
                        className="rounded-full bg-paper px-3 py-1 text-[13px] text-sub ring-1 ring-line transition-colors hover:text-cobalt-b hover:ring-cobalt"
                      >
                        {nombre}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fuentes */}
          {c.fuentes && c.fuentes.length > 0 && (
            <aside className="mt-8 rounded-xl border border-line bg-card2 p-6" aria-label="Fuentes y referencias">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                <Icono nombre="libro" className="h-4 w-4 text-cobalt-b" />
                Fuentes y referencias
              </p>
              <ol className="mt-4 flex flex-col gap-2.5">
                {c.fuentes.map((f, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed">
                    <span className="font-mono text-xs text-gold">[{i + 1}]</span>
                    <a
                      href={f.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sub underline decoration-line underline-offset-4 transition-colors hover:text-cobalt-b"
                    >
                      {f.titulo}
                      <Icono nombre="externo" className="ml-1.5 inline h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-xs leading-relaxed text-faint">
                Si detectas algún dato mejorable, escríbenos a{' '}
                <a href="mailto:curiomundotk@gmail.com" className="text-cobalt-b underline underline-offset-2">
                  curiomundotk@gmail.com
                </a>
                . Las correcciones se revisan y se acreditan.
              </p>
            </aside>
          )}
        </div>

        {/* Siguiente curiosidad */}
        <div className="mx-auto mt-14 max-w-3xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-[#0a1226] p-7 text-[#eef1fa] sm:p-9">
              <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-cobalt/25 blur-[70px]" aria-hidden="true" />
              <p className="relative font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                Una curiosidad te lleva a otra
              </p>
              <h2 className="relative mt-3 font-display text-2xl font-bold leading-snug sm:text-3xl">
                <Link to={`/curiosidad/${siguienteCuriosidad.slug}`} className="transition-colors hover:text-[#9db4ff]">
                  {siguienteCuriosidad.titulo}
                </Link>
              </h2>
              <p className="relative mt-3 line-clamp-2 max-w-2xl text-sm leading-relaxed text-[#aab6d6]">
                {siguienteCuriosidad.excerpt}
              </p>
              <div className="relative mt-6 flex flex-wrap gap-3">
                <Link to={`/curiosidad/${siguienteCuriosidad.slug}`} className="btn btn-gold h-12 !px-6">
                  Seguir explorando
                  <Icono nombre="flecha" className="h-4 w-4" />
                </Link>
                <button type="button" onClick={nuevaSorpresa} className="btn h-12 !px-6 !text-[#eef1fa] !border-[#2a3a63] hover:!border-[#4d6fff]">
                  <Icono nombre="dado" className="h-4.5 w-4.5" />
                  Otra curiosidad
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      {/* Relacionados */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6" aria-labelledby="rel-titulo">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cobalt-b">El Curiomotor ha hablado</p>
          <h2 id="rel-titulo" className="mt-2 font-display text-3xl font-bold tracking-tight">
            También te puede interesar
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {relacionadasMemo.map((r, i) => (
            <Reveal key={r.slug} delay={i * 70}>
              <CuriosidadCard c={r} />
            </Reveal>
          ))}
        </div>
      </section>

      {mismaCategoria.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6" aria-labelledby="cat-titulo">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg text-white" style={{ background: cat.color }}>
                <Icono nombre={cat.id} className="h-5 w-5" />
              </span>
              <div>
                <h2 id="cat-titulo" className="font-display text-2xl font-bold">Más de {cat.nombre}</h2>
                <Link to={`/categoria/${cat.slug}`} className="text-sm font-semibold text-cobalt-b hover:underline">
                  Ver toda la categoría
                </Link>
              </div>
            </div>
          </Reveal>
          <div className="mt-6 flex flex-col gap-3">
            {mismaCategoria.map((r) => (
              <Link
                key={r.slug}
                to={`/curiosidad/${r.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-line bg-card p-3.5 transition-all hover:-translate-y-0.5 hover:border-cobalt/40 hover:shadow-lg"
              >
                <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg">
                  <Cover c={r} decor={false} />
                </div>
                <p className="line-clamp-2 flex-1 font-display text-[15px] font-semibold leading-snug transition-colors group-hover:text-cobalt-b">
                  {r.titulo}
                </p>
                <Icono nombre="flecha" className="h-5 w-5 shrink-0 text-faint transition-transform group-hover:translate-x-1 group-hover:text-cobalt-b" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function RenderBloque({ b }: { b: Bloque }) {
  switch (b.tipo) {
    case 'p':
      return <p className="mt-6 text-[1.06rem] leading-[1.75] text-ink/90 first:mt-0">{b.texto}</p>;
    case 'h2':
      return (
        <h2 className="mt-12 flex items-center gap-3 font-display text-2xl font-bold tracking-tight sm:text-[1.7rem]">
          <span className="inline-block h-7 w-1.5 shrink-0 rounded-full bg-cobalt" aria-hidden="true" />
          {b.texto}
        </h2>
      );
    case 'lista':
      return (
        <ul className="mt-6 flex flex-col gap-3">
          {b.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[1.02rem] leading-relaxed text-ink/90">
              <Icono nombre="chispa" className="mt-1.5 h-4 w-4 shrink-0 text-gold" />
              {item}
            </li>
          ))}
        </ul>
      );
    case 'cita':
      return (
        <blockquote className="mt-10 border-l-4 border-gold bg-card px-6 py-5 rounded-r-xl">
          <p className="font-display text-xl italic leading-relaxed sm:text-[1.35rem]">«{b.texto}»</p>
          {b.autor && <footer className="mt-3 font-mono text-xs uppercase tracking-wider text-faint">— {b.autor}</footer>}
        </blockquote>
      );
    case 'dato':
      return (
        <aside className="mt-10 overflow-hidden rounded-xl border border-cobalt/30 bg-card shadow-sm" aria-label={b.titulo}>
          <p className="flex items-center gap-2 border-b border-line bg-cobalt/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cobalt-b">
            <Icono nombre="rayo" className="h-4 w-4" />
            {b.titulo}
          </p>
          <dl className="grid sm:grid-cols-2">
            {b.items.map((item, i) => (
              <div key={i} className={`px-5 py-4 ${i % 2 === 1 ? 'sm:border-l sm:border-line' : ''} ${i > 1 ? 'border-t border-line' : ''} ${i === 1 ? 'border-t border-line sm:border-t-0' : ''}`}>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-faint">{item.k}</dt>
                <dd className="mt-1 font-display text-lg font-semibold leading-snug">{item.v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      );
    case 'tabla':
      return (
        <div className="mt-8 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="bg-card2 text-left">
                {b.cabeceras.map((h, i) => (
                  <th key={i} scope="col" className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-sub">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.filas.map((fila, i) => (
                <tr key={i} className="border-t border-line">
                  {fila.map((celda, j) => (
                    <td key={j} className={`px-4 py-3 ${j === 0 ? 'font-semibold' : 'text-sub'}`}>
                      {celda}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}


