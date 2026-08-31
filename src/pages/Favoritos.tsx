import { useMemo } from 'react';
import { porSlug } from '../lib/content';
import { aplicarMeta, jsonldBase } from '../lib/meta';
import { useApp } from '../lib/store';
import { Link } from '../lib/router';
import { TarjetaFila } from '../components/CuriosidadCard';
import { Icono } from '../components/Icons';
import { Reveal } from '../components/Reveal';

export function Favoritos() {
  const { favoritos } = useApp();

  useMemo(() => {
    aplicarMeta({
      titulo: 'Mis favoritos — Curiomundo',
      descripcion: 'Tus curiosidades guardadas de Curiomundo, siempre a mano.',
      ruta: 'favoritos',
      noindex: true,
      jsonld: jsonldBase(),
    });
  }, []);

  const guardadas = useMemo(
    () => favoritos.map((s) => porSlug.get(s)).filter((c): c is NonNullable<typeof c> => !!c),
    [favoritos],
  );

  return (
    <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
      <Reveal>
        <header className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cobalt-b">Tu colección</p>
          <h1 className="mt-2 font-display text-4xl font-black tracking-tight sm:text-5xl">Mis favoritos</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-sub">
            {guardadas.length === 0
              ? 'Guarda curiosidades con el corazón y aparecerán aquí. Se quedan en tu navegador: sin cuentas, sin registros.'
              : `${guardadas.length} ${guardadas.length === 1 ? 'curiosidad guardada' : 'curiosidades guardadas'} en este navegador.`}
          </p>
        </header>
      </Reveal>

      {guardadas.length === 0 ? (
        <Reveal>
          <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-line bg-card px-6 py-16 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-danger/10 text-danger">
              <Icono nombre="corazon" className="h-10 w-10" />
            </span>
            <h2 className="mt-6 font-display text-2xl font-bold">Todavía no has guardado nada</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-sub">
              Cuando una curiosidad te vuele la cabeza, pulsa el corazón. Quedará esperándote aquí
              para cuando quieras volver.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/explorar" className="btn btn-primary h-12">
                Explorar curiosidades
                <Icono nombre="flecha" className="h-4 w-4" />
              </Link>
              <Link to="/sorprendeme" className="btn btn-gold h-12">
                <Icono nombre="dado" className="h-4 w-4" />
                Sorpréndeme
              </Link>
            </div>
          </div>
        </Reveal>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {guardadas.map((c, i) => (
            <Reveal key={c.slug} delay={Math.min(i * 50, 250)}>
              <TarjetaFila c={c} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
