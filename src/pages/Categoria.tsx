import { useMemo } from 'react';
import { categoriasPorSlug } from '../data/categorias';
import { aplicarMeta, jsonldBase, jsonldBreadcrumb } from '../lib/meta';
import { porCategoria, conteoCategoria } from '../lib/content';
import { Link, navegar, useRuta } from '../lib/router';
import { CuriosidadCard } from '../components/CuriosidadCard';
import { Icono } from '../components/Icons';
import { Reveal } from '../components/Reveal';
import { PaginaNoEncontrada } from './Estaticas';

const POR_PAGINA = 6;

export function Categoria({ slug }: { slug: string }) {
  const ruta = useRuta();
  const cat = categoriasPorSlug.get(slug);

  const articulos = useMemo(() => (cat ? porCategoria(cat.id) : []), [cat]);
  const totalPaginas = Math.max(1, Math.ceil(articulos.length / POR_PAGINA));
  const pagina = Math.min(
    totalPaginas,
    Math.max(1, parseInt(ruta.query.get('pagina') ?? '1', 10) || 1),
  );
  const visibles = articulos.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  useMemo(() => {
    if (!cat) return;
    aplicarMeta({
      titulo: `${cat.nombre}: curiosidades de ${cat.nombre.toLowerCase()} — Curiomundo`,
      descripcion: cat.descripcion + ` Curiosidades verificadas y contadas con asombro.`,
      ruta: `categoria/${cat.slug}`,
      tipo: 'website',
      jsonld: [
        ...jsonldBase(),
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `Curiosidades de ${cat.nombre}`,
          description: cat.descripcion,
          inLanguage: 'es-ES',
        },
        jsonldBreadcrumb([
          { nombre: 'Inicio', ruta: '' },
          { nombre: 'Categorías', ruta: 'explorar' },
          { nombre: cat.nombre, ruta: `categoria/${cat.slug}` },
        ]),
      ],
    });
  }, [cat]);

  if (!cat) return <PaginaNoEncontrada />;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
      {/* Cabecera de categoría */}
      <Reveal>
        <header
          className="relative overflow-hidden rounded-2xl border border-line p-7 sm:p-10"
          style={{ background: `linear-gradient(120deg, ${cat.color}26, var(--card) 55%)` }}
        >
          <nav aria-label="Miga de pan" className="flex items-center gap-2 font-mono text-xs text-faint">
            <Link to="/" className="transition-colors hover:text-cobalt-b">Inicio</Link>
            <span aria-hidden="true">/</span>
            <span className="text-sub" aria-current="page">{cat.nombre}</span>
          </nav>
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <span
              className="flex h-20 w-20 items-center justify-center rounded-2xl text-white shadow-lg"
              style={{ background: cat.color }}
            >
              <Icono nombre={cat.id} className="h-10 w-10" trazo={1.5} />
            </span>
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-4xl font-black tracking-tight sm:text-5xl">{cat.nombre}</h1>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-sub">{cat.descripcion}</p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-faint">
                {articulos.length} {articulos.length === 1 ? 'curiosidad publicada' : 'curiosidades publicadas'}
              </p>
            </div>
          </div>
        </header>
      </Reveal>

      {articulos.length === 0 ? (
        <EstadoVacioCategoria nombre={cat.nombre} color={cat.color} />
      ) : (
        <>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibles.map((c, i) => (
              <Reveal key={c.slug} delay={Math.min(i * 60, 300)}>
                <CuriosidadCard c={c} />
              </Reveal>
            ))}
          </div>

          {totalPaginas > 1 && (
            <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Paginación">
              <button
                type="button"
                disabled={pagina === 1}
                onClick={() => navegar(`/categoria/${cat.slug}${pagina - 1 > 1 ? `?pagina=${pagina - 1}` : ''}`)}
                className="btn btn-ghost h-11 disabled:pointer-events-none disabled:opacity-40"
              >
                <Icono nombre="atras" className="h-4 w-4" />
                Anterior
              </button>
              {Array.from({ length: totalPaginas }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => navegar(`/categoria/${cat.slug}${i > 0 ? `?pagina=${i + 1}` : ''}`)}
                  aria-current={pagina === i + 1 ? 'page' : undefined}
                  className={`h-11 w-11 rounded-xl border font-mono text-sm transition-all ${
                    pagina === i + 1
                      ? 'border-cobalt bg-cobalt font-bold text-white'
                      : 'border-line bg-card text-sub hover:border-cobalt/50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                type="button"
                disabled={pagina === totalPaginas}
                onClick={() => navegar(`/categoria/${cat.slug}?pagina=${pagina + 1}`)}
                className="btn btn-ghost h-11 disabled:pointer-events-none disabled:opacity-40"
              >
                Siguiente
                <Icono nombre="flecha" className="h-4 w-4" />
              </button>
            </nav>
          )}
        </>
      )}

      {/* Otras categorías */}
      <section className="mt-16 border-t border-line pt-10" aria-label="Otras categorías">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Sigue explorando</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[...categoriasPorSlug.values()]
            .filter((c) => c.slug !== cat.slug)
            .slice(0, 10)
            .map((otra) => (
              <Link
                key={otra.id}
                to={`/categoria/${otra.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-sm text-sub transition-all hover:-translate-y-0.5 hover:border-cobalt hover:text-cobalt-b"
              >
                <span className="h-2 w-2 rounded-full" style={{ background: otra.color }} aria-hidden="true" />
                {otra.nombre}
                <span className="font-mono text-[10px] text-faint">{conteoCategoria(otra.id)}</span>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}

function EstadoVacioCategoria({ nombre, color }: { nombre: string; color: string }) {
  return (
    <div className="mt-12 flex flex-col items-center rounded-2xl border border-dashed border-line bg-card px-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl text-white" style={{ background: color }}>
        <Icono nombre="chispa" className="h-8 w-8" />
      </span>
      <h2 className="mt-5 font-display text-2xl font-bold">
        Esta categoría acaba de abrir sus puertas
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-sub">
        Aún no hay curiosidades publicadas en <strong>{nombre}</strong>, pero el archivo crece cada semana.
        Mientras tanto, el azar nunca falla.
      </p>
      <div className="mt-6 flex gap-3">
        <Link to="/explorar" className="btn btn-ghost h-11">
          Explorar todo
        </Link>
        <Link to="/sorprendeme" className="btn btn-primary h-11">
          <Icono nombre="dado" className="h-4 w-4" />
          Sorpréndeme
        </Link>
      </div>
    </div>
  );
}
