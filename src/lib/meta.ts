/* Utilidad central de SEO: title, description, canonical, OG, Twitter y JSON-LD. */

export const OG_POR_DEFECTO =
  'https://image.qwenlm.ai/generated-images/0af446d5-e570-4b79-af9e-5caae0b27652/_result.png';

export interface MetaPagina {
  titulo: string;
  descripcion: string;
  ruta: string;
  imagen?: string;
  noindex?: boolean;
  tipo?: string;
  jsonld?: object[];
}

function upsertMeta(attr: 'name' | 'property', clave: string, contenido: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${clave}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, clave);
    document.head.appendChild(el);
  }
  el.setAttribute('content', contenido);
}

export function aplicarMeta(m: MetaPagina) {
  document.title = m.titulo;
  const urlOrigen = window.location.href.split('#')[0];
  const canonica = urlOrigen + '#/' + m.ruta.replace(/^\//, '');
  const imagen = m.imagen ?? OG_POR_DEFECTO;

  upsertMeta('name', 'description', m.descripcion);
  upsertMeta('name', 'robots', m.noindex ? 'noindex, nofollow' : 'index, follow');

  upsertMeta('property', 'og:site_name', 'Curiomundo');
  upsertMeta('property', 'og:locale', 'es_ES');
  upsertMeta('property', 'og:type', m.tipo ?? 'website');
  upsertMeta('property', 'og:title', m.titulo);
  upsertMeta('property', 'og:description', m.descripcion);
  upsertMeta('property', 'og:url', canonica);
  upsertMeta('property', 'og:image', imagen);

  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', m.titulo);
  upsertMeta('name', 'twitter:description', m.descripcion);
  upsertMeta('name', 'twitter:image', imagen);

  let canon = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canon) {
    canon = document.createElement('link');
    canon.rel = 'canonical';
    document.head.appendChild(canon);
  }
  canon.href = canonica;

  document.head.querySelectorAll('script[data-cm-ld]').forEach((s) => s.remove());
  for (const obj of m.jsonld ?? []) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-cm-ld', '');
    script.textContent = JSON.stringify(obj);
    document.head.appendChild(script);
  }
}

/** JSON-LD WebSite + Organization, incluido en todas las páginas. */
export function jsonldBase(): object[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Curiomundo',
      description: 'La biblioteca infinita de curiosidades en español.',
      inLanguage: 'es-ES',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Curiomundo',
      email: 'curiomundotk@gmail.com',
    },
  ];
}

export function jsonldBreadcrumb(items: { nombre: string; ruta: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.nombre,
      item: window.location.href.split('#')[0] + '#/' + it.ruta.replace(/^\//, ''),
    })),
  };
}
