import React, { useState } from 'react';
import { useApp } from '../lib/store';
import { Icono } from './Icons';
import { DATOS_TICKER } from '../data/facts';
import { Link, urlAbsoluta } from '../lib/router';

/* ── Botón de favorito ───────────────────────────────────────────── */

export function BotonFavorito({ slug, claro = false }: { slug: string; claro?: boolean }) {
  const { esFavorito, alternarFavorito } = useApp();
  const fav = esFavorito(slug);
  const [latido, setLatido] = useState(false);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        alternarFavorito(slug);
        setLatido(true);
        window.setTimeout(() => setLatido(false), 450);
      }}
      aria-pressed={fav}
      aria-label={fav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
      title={fav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 ${
        claro
          ? 'border-white/25 bg-[#0a1226]/60 text-white backdrop-blur-sm hover:bg-[#0a1226]/85'
          : 'border-line bg-card text-sub hover:border-cobalt/50 hover:text-cobalt-b'
      } ${fav ? '!border-gold/60 !text-gold' : ''} ${latido ? 'fav-pop' : ''}`}
    >
      {fav ? <Icono nombre="favoritos" className="h-4.5 w-4.5" /> : <Icono nombre="corazon" className="h-4.5 w-4.5" />}
    </button>
  );
}

/* ── Compartir (Web Share API + redes) ───────────────────────────── */

export function BotonesCompartir({ titulo, ruta }: { titulo: string; ruta: string }) {
  const [copiado, setCopiado] = useState(false);
  const url = urlAbsoluta(ruta);
  const texto = `${titulo} — Curiomundo`;
  const puedeCompartir = typeof navigator !== 'undefined' && !!navigator.share;

  const compartirNativo = async () => {
    try {
      await navigator.share({ title: 'Curiomundo', text: texto, url });
    } catch {
      /* el usuario canceló */
    }
  };

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 1800);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 1800);
    }
  };

  if (puedeCompartir) {
    return (
      <button
        type="button"
        onClick={compartirNativo}
        className="btn btn-ghost h-11 !px-4 text-sm"
      >
        <Icono nombre="compartir" className="h-4.5 w-4.5" />
        Compartir
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://wa.me/?text=${encodeURIComponent(texto + ' ' + url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartir por WhatsApp"
        title="WhatsApp"
        className="icon-btn"
      >
        <Icono nombre="whatsapp" className="h-4.5 w-4.5" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartir en X"
        title="X (Twitter)"
        className="icon-btn"
      >
        <Icono nombre="xsocial" className="h-4.5 w-4.5" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartir en Facebook"
        title="Facebook"
        className="icon-btn"
      >
        <Icono nombre="facebook" className="h-4.5 w-4.5" />
      </a>
      <button type="button" onClick={copiar} aria-label="Copiar enlace" title="Copiar enlace" className={`icon-btn ${copiado ? '!text-ok' : ''}`}>
        <Icono nombre={copiado ? 'check' : 'copiar'} className="h-4.5 w-4.5" />
      </button>
    </div>
  );
}

/* ── Newsletter ──────────────────────────────────────────────────── */

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState<'idle' | 'error' | 'ok'>('idle');

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEstado('error');
      return;
    }
    try {
      const previas = JSON.parse(localStorage.getItem('cm:newsletter') ?? '[]') as string[];
      localStorage.setItem('cm:newsletter', JSON.stringify([...new Set([...previas, email])]));
    } catch { /* almacenamiento no disponible */ }
    setEstado('ok');
  };

  return (
    <div>
      {estado === 'ok' ? (
        <div className="flex items-center gap-3 rounded-xl border border-ok/40 bg-ok/10 p-4 text-sm text-ok">
          <Icono nombre="check" className="h-5 w-5 shrink-0" />
          <p>
            <strong>¡Dentro!</strong> Cuando el boletín esté activo, tu curiosidad diaria llegará a{' '}
            <span className="font-semibold">{email}</span>.
          </p>
        </div>
      ) : (
        <form onSubmit={enviar} className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="nl-email" className="sr-only">
            Tu correo electrónico
          </label>
          <input
            id="nl-email"
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (estado === 'error') setEstado('idle');
            }}
            placeholder="tu@correo.com"
            className={`h-12 flex-1 rounded-xl border bg-card px-4 text-sm outline-none transition-colors placeholder:text-faint focus:border-cobalt ${
              estado === 'error' ? 'border-danger' : 'border-line'
            }`}
          />
          <button type="submit" className="btn btn-primary h-12 shrink-0 !px-6">
            Quiero mi curiosidad
            <Icono nombre="flecha" className="h-4 w-4" />
          </button>
        </form>
      )}
      {estado === 'error' && (
        <p className="mt-2 text-xs text-danger">Ese correo no parece válido. Revísalo e inténtalo de nuevo.</p>
      )}
      <p className="mt-3 text-xs text-faint">
        Sin spam. Una curiosidad al día cuando pulses enviar… y puedes irte cuando quieras.
      </p>
    </div>
  );
}

/* ── Cinta «¿Sabías que…?» ───────────────────────────────────────── */

export function Ticker() {
  const contenido = (ariaHidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
      {DATOS_TICKER.map((d, i) => (
        <span key={i} className="flex items-center">
          {d.slug ? (
            <Link
              to={`/curiosidad/${d.slug}`}
              className="mx-6 inline-flex items-center gap-2.5 whitespace-nowrap font-mono text-xs tracking-wide text-sub transition-colors hover:text-cobalt-b"
            >
              <Icono nombre="chispa" className="h-3.5 w-3.5 shrink-0 text-gold" />
              {d.texto}
            </Link>
          ) : (
            <span className="mx-6 inline-flex items-center gap-2.5 whitespace-nowrap font-mono text-xs tracking-wide text-sub">
              <Icono nombre="chispa" className="h-3.5 w-3.5 shrink-0 text-gold" />
              {d.texto}
            </span>
          )}
          <span className="h-1 w-1 rounded-full bg-line" aria-hidden="true" />
        </span>
      ))}
    </div>
  );

  return (
    <section aria-label="Datos curiosos rápidos" className="relative overflow-hidden border-y border-line bg-card py-3">
      <div className="ticker-track flex w-max">{contenido(false)}{contenido(true)}</div>
    </section>
  );
}
