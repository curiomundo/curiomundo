import { useMemo } from 'react';
import { curiosidadesPorTag, etiquetasConConteo } from '../lib/content';
import { aplicarMeta, jsonldBase, jsonldBreadcrumb } from '../lib/meta';
import { Link } from '../lib/router';
import { CuriosidadCard } from '../components/CuriosidadCard';
import { Icono } from '../components/Icons';
import { Reveal } from '../components/Reveal';
import { PaginaNoEncontrada } from './Estaticas';

export function Etiqueta({ slug }: { slug: string }) {
  const articulos = useMemo(() => curiosidadesPorTag(slug), [slug]);
  const etiqueta = useMemo(
    () => etiquetasConConteo().find((t) => t.slug === slug)?.etiqueta ?? slug.replace(/-/g, ' '),
    [slug],
  );

  useMemo(() => {
    aplicarMeta({
      titulo: `#${etiqueta}: curiosidades sobre ${etiqueta} — Curiomundo`,
      descripcion: `Todas las curiosidades de Curiomundo etiquetadas con «${etiqueta}».`,
      ruta: `tag/${slug}`,
      jsonld: [
        ...jsonldBase(),
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `Curiosidades sobre ${etiqueta}`,
          inLanguage: 'es-ES',
        },
        jsonldBreadcrumb([
          { nombre: 'Inicio', ruta: '' },
          { nombre: 'Etiquetas', ruta: '' },
          { nombre: etiqueta, ruta: `tag/${slug}` },
        ]),
      ],
    });
  }, [etiqueta, slug]);

  if (articulos.length === 0) return <PaginaNoEncontrada />;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
      <Reveal>
        <header className="rounded-2xl border border-line bg-card p-7 sm:p-10">
          <nav aria-label="Miga de pan" className="flex items-center gap-2 font-mono text-xs text-faint">
            <Link to="/" className="transition-colors hover:text-cobalt-b">Inicio</Link>
            <span aria-hidden="true">/</span>
            <span className="text-sub" aria-current="page">Etiquetas</span>
          </nav>
          <h1 className="mt-5 flex items-center gap-4 font-display text-4xl font-black tracking-tight sm:text-5xl">
            <Icono nombre="etiqueta" className="h-9 w-9 text-cobalt-b sm:h-11 sm:w-11" />
            {etiqueta}
          </h1>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-faint">
            {articulos.length} {articulos.length === 1 ? 'curiosidad con esta etiqueta' : 'curiosidades con esta etiqueta'}
          </p>
        </header>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articulos.map((c, i) => (
          <Reveal key={c.slug} delay={Math.min(i * 60, 300)}>
            <CuriosidadCard c={c} />
          </Reveal>
        ))}
      </div>

      <section className="mt-16 border-t border-line pt-10" aria-label="Otras etiquetas">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Otras etiquetas</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {etiquetasConConteo()
            .filter((t) => t.slug !== slug)
            .slice(0, 16)
            .map((t) => (
              <Link
                key={t.slug}
                to={`/tag/${t.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3.5 py-1.5 text-sm text-sub transition-all hover:-translate-y-0.5 hover:border-cobalt hover:text-cobalt-b"
              >
                <Icono nombre="etiqueta" className="h-3.5 w-3.5" />
                {t.etiqueta}
                <span className="font-mono text-[10px] text-faint">{t.total}</span>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
