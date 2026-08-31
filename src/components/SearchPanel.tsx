import { useEffect, useMemo, useRef, useState } from 'react';
import { buscar, etiquetasConConteo } from '../lib/content';
import { Link, navegar } from '../lib/router';
import { Icono } from './Icons';
import { TarjetaFila } from './CuriosidadCard';

/* Búsqueda instantánea global (atajo Ctrl/Cmd + K o «/»). */

export function SearchPanel({ abierto, onCerrar }: { abierto: boolean; onCerrar: () => void }) {
  const [consulta, setConsulta] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (abierto) {
      setConsulta('');
      window.setTimeout(() => inputRef.current?.focus(), 30);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [abierto]);

  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCerrar();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [abierto, onCerrar]);

  const resultados = useMemo(() => (consulta.trim() ? buscar(consulta, 7) : []), [consulta]);
  const populares = useMemo(() => etiquetasConConteo().slice(0, 10), []);

  if (!abierto) return null;

  const irABusquedaCompleta = () => {
    onCerrar();
    navegar(`/buscar?q=${encodeURIComponent(consulta.trim())}`);
  };

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Buscar curiosidades">
      <button
        type="button"
        className="absolute inset-0 h-full w-full cursor-default bg-[#05080f]/70 backdrop-blur-[3px]"
        onClick={onCerrar}
        aria-label="Cerrar búsqueda"
      />
      <div className="panel-in relative mx-auto mt-[8vh] w-[min(92vw,680px)] overflow-hidden rounded-2xl border border-line bg-card shadow-2xl">
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Icono nombre="buscar" className="h-5 w-5 shrink-0 text-faint" />
          <input
            ref={inputRef}
            type="search"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && consulta.trim()) irABusquedaCompleta();
            }}
            placeholder="Busca por título, tema, personaje, lugar…"
            className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-faint"
            aria-label="Buscar curiosidades"
          />
          <button type="button" onClick={onCerrar} className="icon-btn" aria-label="Cerrar">
            <Icono nombre="cerrar" className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[56vh] overflow-y-auto p-3">
          {consulta.trim() === '' && (
            <div className="p-3">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                Búsquedas populares
              </p>
              <div className="flex flex-wrap gap-2">
                {populares.map((t) => (
                  <button
                    key={t.slug}
                    type="button"
                    onClick={() => setConsulta(t.etiqueta)}
                    className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-sm text-sub transition-colors hover:border-cobalt hover:text-cobalt-b"
                  >
                    {t.etiqueta}
                  </button>
                ))}
              </div>
            </div>
          )}

          {consulta.trim() !== '' && resultados.length === 0 && (
            <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
              <Icono nombre="misterios" className="h-10 w-10 text-faint" />
              <p className="font-display text-lg font-semibold">Sin resultados para «{consulta}»</p>
              <p className="text-sm text-sub">
                Prueba con otro término… o deja que el azar decida por ti.
              </p>
              <Link to="/sorprendeme" onClick={onCerrar} className="btn btn-primary mt-2">
                <Icono nombre="dado" className="h-4 w-4" />
                Sorpréndeme
              </Link>
            </div>
          )}

          <ul className="flex flex-col gap-2">
            {resultados.map((r) => (
              <li key={r.curiosidad.slug}>
                <TarjetaFila
                  c={r.curiosidad}
                  fragmento={
                    r.frag ? (
                      <p className="line-clamp-2 text-[13px] leading-relaxed text-sub">
                        {r.frag.antes}
                        <mark className="rounded-sm bg-gold/25 px-0.5 font-semibold text-ink">{r.frag.medio}</mark>
                        {r.frag.despues}
                      </p>
                    ) : undefined
                  }
                />
              </li>
            ))}
          </ul>
        </div>

        {consulta.trim() !== '' && resultados.length > 0 && (
          <div className="border-t border-line px-5 py-3">
            <button type="button" onClick={irABusquedaCompleta} className="inline-flex items-center gap-2 text-sm font-semibold text-cobalt-b hover:underline">
              Ver todos los resultados de «{consulta.trim()}»
              <Icono nombre="flecha" className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
