import React from 'react';
import type { IconoId } from '../lib/types';

/* Sistema de iconos propio de Curiomundo: todo SVG inline, sin dependencias. */

export type IconoNombre =
  | IconoId
  | 'buscar' | 'dado' | 'sol' | 'luna' | 'menu' | 'cerrar' | 'corazon'
  | 'compartir' | 'copiar' | 'whatsapp' | 'facebook' | 'xsocial' | 'flecha'
  | 'atras' | 'reloj' | 'calendario' | 'autor' | 'etiqueta' | 'chispa'
  | 'check' | 'externo' | 'inicio' | 'mapa' | 'quiz' | 'correo' | 'tiktok'
  | 'libro' | 'favoritos' | 'rayo' | 'infinito';

const TRAZOS: Record<IconoNombre, React.ReactNode> = {
  // ── UI ──
  buscar: (<><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>),
  dado: (<><rect x="3.5" y="3.5" width="17" height="17" rx="4" /><circle cx="8.5" cy="8.5" r="1.1" fill="currentColor" stroke="none" /><circle cx="15.5" cy="8.5" r="1.1" fill="currentColor" stroke="none" /><circle cx="8.5" cy="15.5" r="1.1" fill="currentColor" stroke="none" /><circle cx="15.5" cy="15.5" r="1.1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" /></>),
  sol: (<><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2.5 12h2M19.5 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>),
  luna: <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  cerrar: <path d="m6 6 12 12M18 6 6 18" />,
  corazon: <path d="M12 20.5S3.5 15.5 3.5 9.5a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2c0 6-8.5 11-8.5 11Z" />,
  compartir: (<><circle cx="6" cy="12" r="2.6" /><circle cx="17.5" cy="5.5" r="2.6" /><circle cx="17.5" cy="18.5" r="2.6" /><path d="m8.4 10.8 6.8-4M8.4 13.2l6.8 4" /></>),
  copiar: (<><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>),
  whatsapp: (<><path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Z" /><path d="M9 8.8c-.3 2.6 3.6 6.5 6.2 6.2l.8-1.6-2-1-.9.7c-.9-.4-1.7-1.2-2.1-2.1l.7-.9-1-2-1.7.7Z" /></>),
  facebook: <path d="M14.5 8.5H17V5h-2.5A4.5 4.5 0 0 0 10 9.5V12H7.5v3.5H10V21h3.5v-5.5H16l.5-3.5h-3V9.5a1 1 0 0 1 1-1Z" />,
  xsocial: <path d="m4 4 16 16M20 4 4 20" />,
  flecha: <path d="M4 12h15m0 0-6-6m6 6-6 6" />,
  atras: <path d="M20 12H5m0 0 6-6m-6 6 6 6" />,
  reloj: (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></>),
  calendario: (<><rect x="3.5" y="5" width="17" height="16" rx="2.5" /><path d="M3.5 10h17M8 2.5V7M16 2.5V7" /></>),
  autor: (<><circle cx="12" cy="8" r="3.5" /><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" /></>),
  etiqueta: (<><path d="m3 11 9-8h8v8l-9 8a2 2 0 0 1-2.8 0L3 13.8a2 2 0 0 1 0-2.8Z" transform="translate(0.5 0.5) scale(0.92)" /><circle cx="16" cy="8" r="1.3" fill="currentColor" stroke="none" /></>),
  chispa: <path d="M12 3c.6 4.8 1.9 6.4 7 7-5.1.6-6.4 2.2-7 7-.6-4.8-1.9-6.4-7-7 5.1-.6 6.4-2.2 7-7Z" />,
  check: <path d="m5 13 4.5 4.5L19 7" />,
  externo: (<><path d="M10 5H6.5A2.5 2.5 0 0 0 4 7.5v10A2.5 2.5 0 0 0 6.5 20h10a2.5 2.5 0 0 0 2.5-2.5V14" /><path d="M14 4h6v6M20 4 11 13" /></>),
  inicio: (<><path d="m4 11 8-7 8 7" /><path d="M6 9.5V20h12V9.5" /></>),
  mapa: (<><path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6 9 4Z" /><path d="M9 4v14M15 6v14" /></>),
  quiz: (<><rect x="3.5" y="3.5" width="17" height="17" rx="3.5" /><path d="M9.3 9.2a2.8 2.8 0 1 1 3.9 2.6c-.8.4-1.2.8-1.2 1.7" /><circle cx="12" cy="16.6" r="1" fill="currentColor" stroke="none" /></>),
  correo: (<><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="m4 7.5 8 6 8-6" /></>),
  tiktok: <path d="M14.5 3.5c.4 2.6 2 4.2 4.5 4.5v3c-1.8 0-3.3-.6-4.5-1.5v6.2a5.2 5.2 0 1 1-5.2-5.2c.3 0 .7 0 1 .1v3.2a2.1 2.1 0 1 0 1.2 1.9V3.5h3Z" />,
  libro: (<><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z" /><path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" /></>),
  favoritos: (<><path d="M12 20.5S3.5 15.5 3.5 9.5a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2c0 6-8.5 11-8.5 11Z" fill="currentColor" stroke="none" /></>),
  rayo: <path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12l1-8Z" />,
  infinito: <path d="M8 15.5c-2 0-3.5-1.6-3.5-3.5S6 8.5 8 8.5c3.5 0 4.5 7 8 7 2 0 3.5-1.6 3.5-3.5S18 8.5 16 8.5c-3.5 0-4.5 7-8 7Z" />,
  // ── Categorías ──
  historia: (<><path d="M4 20.5h16M5.5 17.5h13M7 17.5v-8M10.3 17.5v-8M13.7 17.5v-8M17 17.5v-8M4.5 9.5 12 3.5l7.5 6h-15Z" /></>),
  ciencia: (<><path d="M9.5 3.5h5M10.5 3.5v5L5 18a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18L13.5 8.5v-5" /><path d="M7.5 14.5h9" /></>),
  espacio: (<><circle cx="12" cy="12" r="5.5" /><path d="M20.8 8.5c1.6.9 2.4 1.9 2.2 2.9-.4 1.8-4.8 2.6-9.8 1.7S4.4 9.6 4.8 7.8c.2-1 1.4-1.5 3.2-1.6" transform="scale(0.86) translate(2 2)" /></>),
  misterios: (<><path d="M8.8 8.5a3.2 3.2 0 1 1 4.5 2.9c-1 .4-1.5 1-1.5 2.1" /><circle cx="12" cy="16.8" r="1.1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="9" /></>),
  animales: (<><circle cx="7" cy="8" r="1.8" /><circle cx="12" cy="5.8" r="1.8" /><circle cx="17" cy="8" r="1.8" /><path d="M12 11.5c2.8 0 5.5 2.2 5.5 5 0 1.9-1.4 3-3.1 3-.9 0-1.7-.4-2.4-.4s-1.5.4-2.4.4c-1.7 0-3.1-1.1-3.1-3 0-2.8 2.7-5 5.5-5Z" /></>),
  geografia: (<><path d="M12 21.5s-6.5-5.4-6.5-11a6.5 6.5 0 0 1 13 0c0 5.6-6.5 11-6.5 11Z" /><circle cx="12" cy="10.3" r="2.3" /></>),
  tecnologia: (<><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="10" y="10" width="4" height="4" /><path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" /></>),
  cuerpo: (<><path d="M12 20.5S3.5 15.5 3.5 9.5a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2c0 6-8.5 11-8.5 11Z" /><path d="m6.5 11.5 2.5 0 1.5-2.5 2 4.5 1.5-2h3.5" /></>),
  inventos: (<><circle cx="12" cy="12" r="3" /><path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1" /></>),
  guerras: <path d="M12 2.8 5 5.5v5.7c0 4.6 3 8 7 9.9 4-1.9 7-5.3 7-9.9V5.5L12 2.8Z" />,
  personajes: (<><circle cx="12" cy="8.5" r="3.8" /><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" /><path d="m12 1.2.9 1.8h-1.8l.9-1.8Z" fill="currentColor" stroke="none" /></>),
  civilizaciones: <path d="M12 3.5 2.5 20.5h19L12 3.5Zm0 5.5-4.5 8h9l-4.5-8Z" />,
  mar: <path d="M2.5 9c2.4 0 2.4 2 4.8 2s2.3-2 4.7-2 2.4 2 4.8 2 2.3-2 4.7-2M2.5 15c2.4 0 2.4 2 4.8 2s2.3-2 4.7-2 2.4 2 4.8 2 2.3-2 4.7-2" />,
  volcanes: <path d="m9 4.5 3 5 3-5M8 9.5 2.5 20.5h19L16 9.5M12 13v4.5" />,
  universo: (<><circle cx="12" cy="12" r="3" /><path d="M18.5 5.5a14 14 0 0 1 1.4 2.2M4 16.5A14 14 0 0 1 2.8 14M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M6 6l1.3 1.3" /><circle cx="18" cy="17.5" r="1" fill="currentColor" stroke="none" /><circle cx="6.5" cy="7" r="1" fill="currentColor" stroke="none" /></>),
  psicologia: (<><path d="M12 3.5a6.5 6.5 0 0 0-6.5 6.5c0 1.2-.6 1.8-1.3 2.6-.5.6-.2 1.4.5 1.7.8.3 1.3.8 1.3 1.7v1.5A2.5 2.5 0 0 0 8.5 20H10v1h4v-1h1.5a2.5 2.5 0 0 0 2.5-2.5V16c0-.9.5-1.4 1.3-1.7.7-.3 1-1.1.5-1.7-.7-.8-1.3-1.4-1.3-2.6A6.5 6.5 0 0 0 12 3.5Z" /><path d="M12 7v9M9 10h6" /></>),
};

export function Icono({
  nombre,
  className = 'h-5 w-5',
  trazo = 1.7,
}: {
  nombre: IconoNombre;
  className?: string;
  trazo?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={trazo}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {TRAZOS[nombre]}
    </svg>
  );
}

/* Marca: planeta con órbita y chispa de curiosidad. */
export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="15" fill="#0e1a3a" />
      <circle cx="24" cy="24" r="15" fill="none" stroke="#2b50e0" strokeWidth="1.6" />
      <path
        d="M19.4 17.2a5.4 5.4 0 1 1 8.6 4.2c-1.3 1-2.6 1.9-3 4"
        fill="none"
        stroke="#f0f3fb"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="24.6" cy="30.4" r="1.8" fill="#e8a33c" />
      <ellipse
        cx="24"
        cy="24"
        rx="21"
        ry="8.5"
        fill="none"
        stroke="#4d6fff"
        strokeWidth="1.4"
        transform="rotate(-16 24 24)"
        opacity="0.85"
      />
      <circle cx="41.5" cy="17.5" r="2.2" fill="#e8a33c" />
    </svg>
  );
}

export function Logo({ compacto = false }: { compacto?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className={compacto ? 'h-8 w-8' : 'h-9 w-9'} />
      {!compacto && (
        <span className="font-display text-xl font-semibold tracking-tight">
          Curiomundo
        </span>
      )}
    </span>
  );
}
