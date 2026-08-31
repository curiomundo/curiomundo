import React, { useEffect, useState } from 'react';

/* Enrutador basado en hash: funciona sin configuración en GitHub Pages
   (sin errores 404 por recarga directa, sin necesidad de servidor). */

export interface Ruta {
  segmentos: string[];
  query: URLSearchParams;
}

function parseHash(): Ruta {
  const crudo = window.location.hash.replace(/^#\/?/, '');
  const [camino, qs] = crudo.split('?');
  return {
    segmentos: camino ? camino.split('/').filter(Boolean) : [],
    query: new URLSearchParams(qs ?? ''),
  };
}

export function useRuta(): Ruta {
  const [ruta, setRuta] = useState<Ruta>(parseHash);
  useEffect(() => {
    const alCambiar = () => setRuta(parseHash());
    window.addEventListener('hashchange', alCambiar);
    return () => window.removeEventListener('hashchange', alCambiar);
  }, []);
  return ruta;
}

export function navegar(to: string, reemplazar = false) {
  const destino = '#' + (to.startsWith('/') ? to : '/' + to);
  if (reemplazar) {
    const url = window.location.pathname + window.location.search + destino;
    window.location.replace(url);
  } else {
    window.location.hash = destino;
  }
}

export function urlAbsoluta(ruta: string): string {
  const base = window.location.href.split('#')[0];
  return base + '#' + (ruta.startsWith('/') ? ruta : '/' + ruta);
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

export function Link({ to, children, ...resto }: LinkProps) {
  const href = '#' + (to.startsWith('/') ? to : '/' + to);
  return (
    <a href={href} {...resto}>
      {children}
    </a>
  );
}
