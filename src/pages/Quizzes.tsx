import { useMemo } from 'react';
import { QUIZZES } from '../data/quizzes';
import { CATEGORIAS } from '../data/categorias';
import { aplicarMeta, jsonldBase } from '../lib/meta';
import { Link } from '../lib/router';
import { Icono } from '../components/Icons';
import { Reveal } from '../components/Reveal';

export function Quizzes() {
  useMemo(() => {
    aplicarMeta({
      titulo: 'Quizzes de curiosidades — Curiomundo',
      descripcion:
        'Ponte a prueba con quizzes de historia, ciencia, espacio y más. Cada respuesta incluye su explicación: ganes o pierdas, aprendes.',
      ruta: 'quizzes',
      jsonld: jsonldBase(),
    });
  }, []);

  const totalPreguntas = QUIZZES.reduce((acc, q) => acc + q.preguntas.length, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
      <Reveal>
        <header className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cobalt-b">Ponte a prueba</p>
          <h1 className="mt-2 font-display text-4xl font-black tracking-tight sm:text-5xl">Quizzes</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-sub sm:text-base">
            {QUIZZES.length} quizzes, {totalPreguntas} preguntas. Sin registro, sin puntuaciones falsas:
            solo tú contra lo que creías saber. Cada respuesta llega con su porqué.
          </p>
        </header>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {QUIZZES.map((q, i) => {
          const cat = CATEGORIAS.find((c) => c.id === q.categoria)!;
          return (
            <Reveal key={q.slug} delay={Math.min(i * 70, 350)}>
              <Link
                to={`/quiz/${q.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span
                  className="absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-[0.12] transition-transform duration-500 group-hover:scale-125"
                  style={{ background: cat.color }}
                  aria-hidden="true"
                />
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow" style={{ background: cat.color }}>
                    <Icono nombre={cat.id} className="h-6 w-6" />
                  </span>
                  <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-faint">
                    {q.dificultad}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold leading-tight transition-colors group-hover:text-cobalt-b">
                  {q.titulo}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-sub">{q.descripcion}</p>
                <p className="mt-auto flex items-center gap-2 pt-5 font-mono text-[11px] uppercase tracking-wider text-faint">
                  {q.preguntas.length} preguntas
                  <span className="ml-auto inline-flex items-center gap-1.5 font-semibold normal-case tracking-normal text-cobalt-b transition-transform group-hover:translate-x-1">
                    Jugar
                    <Icono nombre="flecha" className="h-4 w-4" />
                  </span>
                </p>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-14">
        <div className="rounded-2xl border border-dashed border-line bg-card px-6 py-8 text-center">
          <p className="font-display text-xl font-bold">¿Más quizzes en camino?</p>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-sub">
            El sistema de quizzes está pensado para crecer: nuevas baterías de preguntas se publican
            con cada tanda de curiosidades. Si quieres proponer un tema,{' '}
            <a href="mailto:curiomundotk@gmail.com" className="font-semibold text-cobalt-b underline underline-offset-2">
              escríbenos
            </a>
            .
          </p>
        </div>
      </Reveal>
    </div>
  );
}
