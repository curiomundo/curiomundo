import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { buscar, destacadas, etiquetasConConteo } from '../lib/content';
import { aplicarMeta, jsonldBase } from '../lib/meta';
import { navegar } from '../lib/router';
import { TarjetaFila } from '../components/CuriosidadCard';
import { Icono } from '../components/Icons';
import { Reveal } from '../components/Reveal';
import type { IconoId } from '../lib/types';
import { CATEGORIAS } from '../data/categorias';

export function Buscar({ consultaInicial }: { consultaInicial: string }) {
  const [consulta, setConsulta] = useState(consultaInicial);
  const [filtroCat, setFiltroCat] = useState<'todas' | IconoId>('todas');

  useEffect(() => {
    setConsulta(consultaInicial);
    setFiltroCat('todas');
  }, [consultaInicial]);

  useMemo(() => {
    aplicarMeta({
      titulo: consultaInicial
        ? `«${consultaInicial}»: resultados de búsqueda — Curiomundo`
        : 'Buscar curiosidades — Curiomundo',
      descripcion: 'Busca entre todas las curiosidades de Curiomundo por título, tema, personaje, lugar o concepto.',
      ruta: consultaInicial ? `buscar?q=${encodeURIComponent(consultaInicial)}` : 'buscar',
      noindex: true,
      jsonld: jsonldBase(),
    });
  }, [consultaInicial]);

  const resultados = useMemo(() => (consulta.trim() ? buscar(consulta.trim(), 60) : []), [consulta]);
  const filtrados = useMemo(
    () => (filtroCat === 'todas' ? resultados : resultados.filter((r) => r.curiosidad.categoria === filtroCat)),
    [resultados, filtroCat],
  );
  const sugerencias = useMemo(() => destacadas(3), []);
  const populares = useMemo(() => etiquetasConConteo().slice(0, 14), []);

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    navegar(`/buscar?q=${encodeURIComponent(consulta.trim())}`, true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cobalt-b">Buscador</p>
      <h1 className="mt-2 font-display text-4xl font-black tracking-tight sm:text-5xl">
        ¿Qué quieres descubrir?
      </h1>

      <form onSubmit={enviar} role="search" className="mt-7 flex gap-3">
        <label htmlFor="busqueda-pagina" className="sr-only">Buscar curiosidades</label>
        <div className="relative flex-1">
          <Icono nombre="buscar" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-faint" />
          <input
            id="busqueda-pagina"
            type="search"
            autoFocus
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            placeholder="Roma, agujeros negros, Cleopatra, cerebro…"
            className="h-14 w-full rounded-xl border border-line bg-card pl-12 pr-4 text-base shadow-sm outline-none transition-all placeholder:text-faint focus:border-cobalt focus:shadow-lg focus:shadow-cobalt/10"
          />
        </div>
        <button type="submit" className="btn btn-primary h-14 shrink-0 !px-6">
          Buscar
        </button>
      </form>

      {/* Sin consulta: sugerencias */}
      {!consulta.trim() && (
        <div className="mt-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Empieza por aquí</p>
          <div className="mt-4 flex flex-col gap-3">
            {sugerencias.map((c) => (
              <TarjetaFila key={c.slug} c={c} />
            ))}
          </div>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">También puedes probar con</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {populares.map((t) => (
              <button
                key={t.slug}
                type="button"
                onClick={() => {
                  setConsulta(t.etiqueta);
                  navegar(`/buscar?q=${encodeURIComponent(t.etiqueta)}`, true);
                }}
                className="rounded-full border border-line bg-card px-3.5 py-1.5 text-sm text-sub transition-colors hover:border-cobalt hover:text-cobalt-b"
              >
                {t.etiqueta}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Con consulta */}
      {consulta.trim() && (
        <div className="mt-8">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-faint" aria-live="polite">
            {resultados.length} {resultados.length === 1 ? 'resultado' : 'resultados'} para{' '}
            <span className="text-cobalt-b">«{consulta.trim()}»</span>
            {filtroCat !== 'todas' && ` · filtrado por ${CATEGORIAS.find((c) => c.id === filtroCat)?.nombre}`}
          </p>

          {resultados.length > 0 && (
            <div className="scroll-row -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
              <button
                type="button"
                onClick={() => setFiltroCat('todas')}
                className={`chip-filtro ${filtroCat === 'todas' ? 'activo' : ''}`}
              >
                Todas
              </button>
              {CATEGORIAS.filter((cat) => resultados.some((r) => r.curiosidad.categoria === cat.id)).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFiltroCat(cat.id)}
                  className={`chip-filtro ${filtroCat === cat.id ? 'activo' : ''}`}
                  style={filtroCat === cat.id ? { background: cat.color, borderColor: cat.color } : undefined}
                >
                  <Icono nombre={cat.id} className="h-3.5 w-3.5" />
                  {cat.nombre}
                </button>
              ))}
            </div>
          )}

          {filtrados.length > 0 ? (
            <div className="mt-5 flex flex-col gap-3">
              {filtrados.map((r, i) => (
                <Reveal key={r.curiosidad.slug} delay={Math.min(i * 40, 200)}>
                  <TarjetaFila
                    c={r.curiosidad}
                    fragmento={
                      r.frag ? (
                        <p className="line-clamp-2 text-[13px] leading-relaxed text-sub sm:text-sm">
                          {r.frag.antes}
                          <mark className="rounded-sm bg-gold/25 px-0.5 font-semibold text-ink">{r.frag.medio}</mark>
                          {r.frag.despues}
                        </p>
                      ) : undefined
                    }
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-line bg-card px-6 py-16 text-center">
              <Icono nombre="misterios" className="h-12 w-12 text-faint" />
              <h2 className="mt-5 font-display text-2xl font-bold">
                {resultados.length === 0 ? `Nada para «${consulta.trim()}»` : 'Nada en esta categoría'}
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-sub">
                {resultados.length === 0
                  ? 'El archivo crece cada semana; quizá esa curiosidad llegue pronto. Prueba con un término más general… o ríndete al azar.'
                  : 'Hay resultados, pero no en la categoría elegida. Quita el filtro o prueba otra.'}
              </p>
              {resultados.length === 0 && (
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={() => setConsulta('')} className="btn btn-ghost h-11">
                    Ver sugerencias
                  </button>
                  <a href="#/sorprendeme" className="btn btn-primary h-11">
                    <Icono nombre="dado" className="h-4 w-4" />
                    Sorpréndeme
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
