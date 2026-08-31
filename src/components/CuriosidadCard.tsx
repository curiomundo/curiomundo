import type { Curiosidad } from '../lib/types';
import { getCategoria } from '../data/categorias';
import { tiempoLectura, formatoFecha } from '../lib/content';
import { Link } from '../lib/router';
import { Cover } from './Cover';
import { Icono } from './Icons';
import { BotonFavorito } from './Bits';

/* Tarjeta de curiosidad en tres variantes: vertical, horizontal y fila. */

export function ChipCategoria({ categoria, pequeno = false }: { categoria: Curiosidad['categoria']; pequeno?: boolean }) {
  const cat = getCategoria(categoria);
  return (
    <Link
      to={`/categoria/${cat.slug}`}
      className={`inline-flex items-center gap-1.5 rounded-full font-mono uppercase tracking-wider text-white transition-transform hover:scale-[1.04] ${pequeno ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11px]'}`}
      style={{ background: cat.color }}
      aria-label={`Categoría ${cat.nombre}`}
    >
      <Icono nombre={cat.id} className={pequeno ? 'h-3 w-3' : 'h-3.5 w-3.5'} trazo={2} />
      {cat.nombre}
    </Link>
  );
}

export function CuriosidadCard({
  c,
  variante = 'vertical',
  indice,
}: {
  c: Curiosidad;
  variante?: 'vertical' | 'horizontal' | 'fila';
  indice?: string;
}) {
  if (variante === 'horizontal') return <TarjetaHorizontal c={c} />;
  if (variante === 'fila') return <TarjetaFila c={c} />;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cobalt/10">
      <Link to={`/curiosidad/${c.slug}`} className="relative block aspect-[16/10] overflow-hidden" aria-label={c.titulo}>
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.05]">
          <Cover c={c} />
        </div>
        <div className="absolute left-3 top-3">
          <ChipCategoria categoria={c.categoria} pequeno />
        </div>
        <div className="absolute right-3 top-3" onClick={(e) => e.preventDefault()}>
          <BotonFavorito slug={c.slug} claro />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <h3 className="font-display text-lg font-semibold leading-snug">
          <Link to={`/curiosidad/${c.slug}`} className="transition-colors group-hover:text-cobalt-b">
            {c.titulo}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-sub">{c.excerpt}</p>
        <div className="mt-auto flex items-center gap-4 pt-2 font-mono text-[11px] uppercase tracking-wider text-faint">
          <span className="inline-flex items-center gap-1.5">
            <Icono nombre="reloj" className="h-3.5 w-3.5" />
            {tiempoLectura(c)} min
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icono nombre="calendario" className="h-3.5 w-3.5" />
            {formatoFecha(c.pubDate)}
          </span>
        </div>
      </div>
      {indice && (
        <span className="pointer-events-none absolute -right-2 -top-5 font-display text-7xl font-black text-ink/[0.05]" aria-hidden="true">
          {indice}
        </span>
      )}
    </article>
  );
}

function TarjetaHorizontal({ c }: { c: Curiosidad }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cobalt/10 sm:flex-row">
      <Link to={`/curiosidad/${c.slug}`} className="relative block aspect-[16/10] overflow-hidden sm:aspect-auto sm:w-[44%] sm:shrink-0" aria-label={c.titulo}>
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.05]">
          <Cover c={c} />
        </div>
        <div className="absolute left-3 top-3">
          <ChipCategoria categoria={c.categoria} pequeno />
        </div>
      </Link>
      <div className="relative flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-xl font-semibold leading-snug sm:text-2xl">
          <Link to={`/curiosidad/${c.slug}`} className="transition-colors group-hover:text-cobalt-b">
            {c.titulo}
          </Link>
        </h3>
        <p className="line-clamp-3 text-[15px] leading-relaxed text-sub">{c.excerpt}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 font-mono text-[11px] uppercase tracking-wider text-faint">
          <span className="inline-flex items-center gap-1.5">
            <Icono nombre="reloj" className="h-3.5 w-3.5" />
            {tiempoLectura(c)} min de lectura
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icono nombre="calendario" className="h-3.5 w-3.5" />
            {formatoFecha(c.pubDate)}
          </span>
          <span className="ml-auto flex items-center gap-2">
            <BotonFavorito slug={c.slug} />
            <Link to={`/curiosidad/${c.slug}`} className="inline-flex items-center gap-1.5 font-semibold normal-case tracking-normal text-cobalt-b transition-transform group-hover:translate-x-1">
              Descubrir
              <Icono nombre="flecha" className="h-4 w-4" />
            </Link>
          </span>
        </div>
      </div>
    </article>
  );
}

export function TarjetaFila({ c, fragmento }: { c: Curiosidad; fragmento?: React.ReactNode }) {
  return (
    <article className="group relative flex gap-4 rounded-xl border border-line bg-card p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cobalt/40 hover:shadow-lg sm:gap-5 sm:p-4">
      <Link to={`/curiosidad/${c.slug}`} className="relative block h-24 w-28 shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-40" aria-label={c.titulo}>
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.06]">
          <Cover c={c} decor={false} />
        </div>
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-3">
          <ChipCategoria categoria={c.categoria} pequeno />
          <BotonFavorito slug={c.slug} />
        </div>
        <h3 className="line-clamp-2 font-display text-[15px] font-semibold leading-snug sm:text-base">
          <Link to={`/curiosidad/${c.slug}`} className="transition-colors group-hover:text-cobalt-b">
            {c.titulo}
          </Link>
        </h3>
        {fragmento ?? <p className="line-clamp-2 text-[13px] leading-relaxed text-sub sm:text-sm">{c.excerpt}</p>}
        <span className="mt-auto font-mono text-[10px] uppercase tracking-wider text-faint">
          {tiempoLectura(c)} min · {formatoFecha(c.pubDate)}
        </span>
      </div>
    </article>
  );
}
