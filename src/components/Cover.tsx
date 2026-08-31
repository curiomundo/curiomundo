import { useState } from 'react';
import type { Curiosidad } from '../lib/types';
import { getCategoria } from '../data/categorias';
import { semillaDe } from '../lib/content';
import { Icono } from './Icons';

/* Portada de artículo: imagen real si existe, si no portada procedural
   determinista generada a partir del slug y el color de la categoría. */

export function Cover({
  c,
  className = '',
  eager = false,
  decor = true,
}: {
  c: Curiosidad;
  className?: string;
  eager?: boolean;
  decor?: boolean;
}) {
  const [fallida, setFallida] = useState(false);
  const cat = getCategoria(c.categoria);

  if (c.imagen && !fallida) {
    return (
      <img
        src={c.imagen}
        alt={decor ? c.imageAlt : ''}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFallida(true)}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  return <PortadaProcedural c={c} className={className} />;
}

function PortadaProcedural({ c, className = '' }: { c: Curiosidad; className?: string }) {
  const cat = getCategoria(c.categoria);
  const semilla = semillaDe(c.slug);
  const variante = semilla % 3;
  const cx = 120 + (semilla % 400);
  const cy = 60 + ((semilla >> 3) % 280);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} role="img" aria-label={c.imageAlt}>
      <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={`g-${c.slug}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a1226" />
            <stop offset="100%" stopColor="#101c3d" />
          </linearGradient>
          <radialGradient id={`r-${c.slug}`} cx="30%" cy="20%" r="90%">
            <stop offset="0%" stopColor={cat.color} stopOpacity="0.5" />
            <stop offset="100%" stopColor={cat.color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="640" height="400" fill={`url(#g-${c.slug})`} />
        <rect width="640" height="400" fill={`url(#r-${c.slug})`} />
        {variante === 0 && (
          <g fill="none" stroke={cat.color} strokeOpacity="0.55">
            {[28, 64, 104, 150, 202, 260, 324].map((r) => (
              <circle key={r} cx={cx} cy={cy} r={r} strokeWidth={r === 104 ? 2.4 : 1.1} />
            ))}
          </g>
        )}
        {variante === 1 && (
          <g fill="none" stroke={cat.color} strokeOpacity="0.5" strokeWidth="1.2">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <path
                key={i}
                d={`M-40 ${40 + i * 48} q 180 ${i % 2 === 0 ? -34 : 34} 360 0 t 360 0`}
                strokeWidth={i === 3 ? 2.6 : 1.1}
              />
            ))}
          </g>
        )}
        {variante === 2 && (
          <g fill={cat.color} fillOpacity="0.5">
            {Array.from({ length: 48 }).map((_, i) => {
              const x = ((i * 97 + semilla) % 620) + 10;
              const y = ((i * 61 + semilla * 3) % 380) + 10;
              return <circle key={i} cx={x} cy={y} r={i % 7 === 0 ? 3.4 : 1.6} />;
            })}
            <circle cx={cx} cy={cy} r="86" fill="none" stroke={cat.color} strokeOpacity="0.6" strokeWidth="1.6" />
            <circle cx={cx} cy={cy} r="118" fill="none" stroke={cat.color} strokeOpacity="0.35" strokeWidth="1.1" />
          </g>
        )}
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
        <span className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f0f3fb]" style={{ background: `${cat.color}cc` }}>
          {cat.nombre}
        </span>
        <Icono nombre={cat.id} className="h-12 w-12 opacity-50 text-[#f0f3fb]" />
      </div>
    </div>
  );
}
