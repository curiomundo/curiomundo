import { useMemo, useState } from 'react';
import { quizPorSlug, QUIZZES } from '../data/quizzes';
import { relacionadas, porCategoria } from '../lib/content';
import { aplicarMeta, jsonldBase } from '../lib/meta';
import { Link, navegar } from '../lib/router';
import { CuriosidadCard } from '../components/CuriosidadCard';
import { Icono } from '../components/Icons';
import { Reveal } from '../components/Reveal';
import { PaginaNoEncontrada } from './Estaticas';

export function QuizJugar({ slug }: { slug: string }) {
  const quiz = quizPorSlug.get(slug);
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [aciertos, setAciertos] = useState(0);
  const [terminado, setTerminado] = useState(false);

  useMemo(() => {
    if (!quiz) return;
    aplicarMeta({
      titulo: `Quiz: ${quiz.titulo} — Curiomundo`,
      descripcion: quiz.descripcion,
      ruta: `quiz/${quiz.slug}`,
      jsonld: [
        ...jsonldBase(),
        {
          '@context': 'https://schema.org',
          '@type': 'Quiz',
          name: quiz.titulo,
          description: quiz.descripcion,
          inLanguage: 'es-ES',
        },
      ],
    });
  }, [quiz]);

  const sugerencias = useMemo(() => {
    if (!quiz) return [];
    const porCat = porCategoria(quiz.categoria).slice(0, 3);
    const rel = relacionadas(porCat[0]?.slug ?? '', 3);
    return [...porCat, ...rel.filter((r) => !porCat.some((p) => p.slug === r.slug))].slice(0, 3);
  }, [quiz]);

  if (!quiz) return <PaginaNoEncontrada />;

  const pregunta = quiz.preguntas[indice];
  const esUltima = indice === quiz.preguntas.length - 1;

  const responder = (i: number) => {
    if (seleccion !== null) return;
    setSeleccion(i);
    if (i === pregunta.correcta) setAciertos((a) => a + 1);
  };

  const siguiente = () => {
    if (esUltima) {
      setTerminado(true);
      window.scrollTo({ top: 0 });
    } else {
      setIndice((i) => i + 1);
      setSeleccion(null);
      window.scrollTo({ top: 0 });
    }
  };

  const reiniciar = () => {
    setIndice(0);
    setSeleccion(null);
    setAciertos(0);
    setTerminado(false);
    window.scrollTo({ top: 0 });
  };

  const porcentaje = Math.round((aciertos / quiz.preguntas.length) * 100);
  const mensaje =
    porcentaje === 100
      ? 'Perfecto. Oficialmente sabes más que la mayoría.'
      : porcentaje >= 60
        ? 'Nada mal: tu cerebro curioso está en forma.'
        : 'Has perdido el quiz, pero te llevas los datos. Eso vale más.';

  if (terminado) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-12 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-line bg-card p-8 text-center sm:p-12">
            <div className="absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gold/15 blur-[70px]" aria-hidden="true" />
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Quiz completado</p>
            <h1 className="mt-3 font-display text-3xl font-black sm:text-4xl">{quiz.titulo}</h1>
            <p className="mt-8 font-display text-7xl font-black text-cobalt-b">
              {aciertos}<span className="text-3xl text-faint">/{quiz.preguntas.length}</span>
            </p>
            <div className="mx-auto mt-5 h-2.5 w-full max-w-sm overflow-hidden rounded-full bg-paper">
              <div
                className="h-full rounded-full bg-cobalt transition-all duration-700"
                style={{ width: `${porcentaje}%` }}
              />
            </div>
            <p className="mt-5 text-lg font-medium text-sub">{mensaje}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={reiniciar} className="btn btn-ghost h-12">
                <Icono nombre="atras" className="h-4 w-4" />
                Repetir quiz
              </button>
              <Link to="/quizzes" className="btn btn-primary h-12">
                Otros quizzes
                <Icono nombre="flecha" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>

        {sugerencias.length > 0 && (
          <section className="mt-14" aria-labelledby="quiz-rel">
            <h2 id="quiz-rel" className="font-display text-2xl font-bold">
              Para rematar: curiosidades del tema
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sugerencias.map((c) => (
                <CuriosidadCard key={c.slug} c={c} />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
      <nav aria-label="Miga de pan" className="flex items-center gap-2 font-mono text-xs text-faint">
        <Link to="/quizzes" className="transition-colors hover:text-cobalt-b">Quizzes</Link>
        <span aria-hidden="true">/</span>
        <span className="text-sub" aria-current="page">{quiz.titulo}</span>
      </nav>

      <div className="mt-6 flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-black tracking-tight sm:text-3xl">{quiz.titulo}</h1>
        <span className="shrink-0 rounded-full border border-line bg-card px-3.5 py-1.5 font-mono text-xs text-sub">
          {indice + 1} / {quiz.preguntas.length}
        </span>
      </div>

      {/* Progreso */}
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-card2" role="progressbar" aria-valuenow={indice + 1} aria-valuemin={1} aria-valuemax={quiz.preguntas.length} aria-label="Progreso del quiz">
        <div
          className="h-full rounded-full bg-cobalt transition-all duration-500"
          style={{ width: `${((indice + (seleccion !== null ? 1 : 0)) / quiz.preguntas.length) * 100}%` }}
        />
      </div>

      <div key={indice} className="panel-in mt-8 rounded-2xl border border-line bg-card p-6 sm:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          Pregunta {indice + 1} · {aciertos} {aciertos === 1 ? 'acierto' : 'aciertos'}
        </p>
        <h2 className="mt-3 font-display text-xl font-bold leading-snug sm:text-2xl">{pregunta.texto}</h2>

        <div className="mt-6 flex flex-col gap-3" role="group" aria-label="Opciones de respuesta">
          {pregunta.opciones.map((op, i) => {
            const correcta = i === pregunta.correcta;
            const elegida = i === seleccion;
            let clase = 'border-line bg-paper hover:border-cobalt hover:bg-cobalt/5';
            if (seleccion !== null) {
              if (correcta) clase = 'border-ok bg-ok/10 text-ok';
              else if (elegida) clase = 'border-danger bg-danger/10 text-danger';
              else clase = 'border-line bg-paper opacity-55';
            }
            return (
              <button
                key={i}
                type="button"
                onClick={() => responder(i)}
                disabled={seleccion !== null}
                className={`flex items-center gap-4 rounded-xl border p-4 text-left text-[15px] font-medium transition-all duration-200 ${clase}`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-current font-mono text-sm">
                  {seleccion !== null && correcta ? (
                    <Icono nombre="check" className="h-4 w-4" />
                  ) : seleccion !== null && elegida ? (
                    <Icono nombre="cerrar" className="h-4 w-4" />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                {op}
              </button>
            );
          })}
        </div>

        {seleccion !== null && (
          <div
            className={`panel-in mt-6 rounded-xl border p-5 ${
              seleccion === pregunta.correcta ? 'border-ok/50 bg-ok/10' : 'border-danger/50 bg-danger/10'
            }`}
            aria-live="polite"
          >
            <p className={`flex items-center gap-2 font-display text-lg font-bold ${seleccion === pregunta.correcta ? 'text-ok' : 'text-danger'}`}>
              <Icono nombre={seleccion === pregunta.correcta ? 'check' : 'cerrar'} className="h-5 w-5" />
              {seleccion === pregunta.correcta ? '¡Correcto!' : 'Casi…'}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink/85">{pregunta.explicacion}</p>
            <button type="button" onClick={siguiente} className="btn btn-primary mt-4 h-11">
              {esUltima ? 'Ver resultado' : 'Siguiente pregunta'}
              <Icono nombre="flecha" className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <Link to="/quizzes" className="btn btn-ghost h-11">
          <Icono nombre="atras" className="h-4 w-4" />
          Salir del quiz
        </Link>
        <button
          type="button"
          onClick={() => navegar(`/curiosidad/${relacionadas('', 1)[0]?.slug ?? 'el-corazon-de-una-ballena-azul'}`)}
          className="btn btn-ghost h-11 text-gold"
        >
          <Icono nombre="dado" className="h-4 w-4" />
          Prefiero leer algo
        </button>
      </div>
    </div>
  );
}

export function otrosQuizzesSlug(actual: string): string[] {
  return QUIZZES.filter((q) => q.slug !== actual).map((q) => q.slug);
}
