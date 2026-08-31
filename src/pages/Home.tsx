import { useMemo, useState, type FormEvent } from 'react';
import { CATEGORIAS } from '../data/categorias';
import { QUIZZES } from '../data/quizzes';
import {
  TOTAL_CATEGORIAS, TOTAL_CURIOSIDADES, TOTAL_ETIQUETAS,
  aleatoria, conteoCategoria, curiosidadDelDia, destacadas,
  entidadesAgrupadas, etiquetasConConteo, recientes,
} from '../lib/content';
import { aplicarMeta, jsonldBase } from '../lib/meta';
import { Link, navegar } from '../lib/router';
import { useScramble } from '../lib/hooks';
import { CuriosidadCard } from '../components/CuriosidadCard';
import { Cover } from '../components/Cover';
import { Icono, IconoNombre } from '../components/Icons';
import { Newsletter, Ticker } from '../components/Bits';
import { Reveal } from '../components/Reveal';

const PREGUNTAS_FLOTANTES = [
  { t: '¿Por qué el cielo es azul?', x: '6%', y: '18%', r: '-7deg', s: 'text-sm' },
  { t: '¿Qué hay dentro de un agujero negro?', x: '74%', y: '10%', r: '5deg', s: 'text-xs' },
  { t: '¿Quién escribió el Voynich?', x: '62%', y: '68%', r: '-4deg', s: 'text-sm' },
  { t: '¿Cuánto pesa una nube?', x: '12%', y: '70%', r: '6deg', s: 'text-xs' },
  { t: '¿Existió realmente Troya?', x: '84%', y: '42%', r: '-6deg', s: 'text-xs' },
];

export function Home() {
  const titulo = useScramble('Curiomundo');
  const [consulta, setConsulta] = useState('');
  const delDia = useMemo(() => curiosidadDelDia(), []);
  const sorprendentes = useMemo(() => destacadas(6), []);
  const ultimas = useMemo(() => recientes(6), []);
  const etiquetas = useMemo(() => etiquetasConConteo().slice(0, 18), []);
  const entidades = useMemo(() => entidadesAgrupadas(), []);

  useMemo(() => {
    aplicarMeta({
      titulo: 'Curiomundo — Descubre algo que no sabías que querías saber',
      descripcion:
        'La biblioteca infinita de curiosidades en español: historia, ciencia, espacio, misterios y mucho más. Entras por una curiosidad y acabas descubriendo diez.',
      ruta: '',
      jsonld: [...jsonldBase()],
    });
  }, []);

  const buscarDesdeHero = (e: FormEvent) => {
    e.preventDefault();
    const q = consulta.trim();
    if (q) navegar(`/buscar?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="fondo-hero absolute inset-0" aria-hidden="true">
          <div className="absolute -left-32 -top-40 h-[480px] w-[480px] rounded-full bg-cobalt/15 blur-[120px]" />
          <div className="absolute -right-24 top-24 h-[380px] w-[380px] rounded-full bg-gold/10 blur-[110px]" />
          {PREGUNTAS_FLOTANTES.map((p, i) => (
            <span
              key={i}
              className={`flota absolute hidden select-none font-mono ${p.s} text-faint/70 lg:block`}
              style={{ left: p.x, top: p.y, transform: `rotate(${p.r})`, animationDelay: `${i * 0.8}s` }}
            >
              {p.t}
            </span>
          ))}
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:pb-24 lg:pt-20">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-sub">
                <Icono nombre="chispa" className="h-3.5 w-3.5 text-gold" />
                La biblioteca infinita de curiosidades
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-[13vw] font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.2rem]">
                {titulo}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-sub sm:text-xl">
                Descubre algo que <em className="font-display not-italic text-cobalt-b">no sabías que querías saber</em>.
                Historia, ciencia, espacio, misterios… una curiosidad te lleva a otra.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <form onSubmit={buscarDesdeHero} role="search" className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
                <label htmlFor="busqueda-hero" className="sr-only">¿Qué quieres descubrir?</label>
                <div className="relative flex-1">
                  <Icono nombre="buscar" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-faint" />
                  <input
                    id="busqueda-hero"
                    type="search"
                    value={consulta}
                    onChange={(e) => setConsulta(e.target.value)}
                    placeholder="¿Qué quieres descubrir?"
                    className="h-14 w-full rounded-xl border border-line bg-card pl-12 pr-4 text-base shadow-sm outline-none transition-all placeholder:text-faint focus:border-cobalt focus:shadow-lg focus:shadow-cobalt/10"
                  />
                </div>
                <button type="submit" className="btn btn-primary h-14 shrink-0 !px-7 text-base">
                  Buscar
                </button>
              </form>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => navegar(`/curiosidad/${aleatoria().slug}`)}
                  className="btn btn-gold h-12 !px-6"
                >
                  <Icono nombre="dado" className="h-5 w-5" />
                  Sorpréndeme
                </button>
                <Link to={`/curiosidad/${delDia.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-sub transition-colors hover:text-cobalt-b">
                  <Icono nombre="calendario" className="h-4 w-4" />
                  Curiosidad de hoy
                  <Icono nombre="flecha" className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
                {[
                  { v: String(TOTAL_CURIOSIDADES), k: 'curiosidades' },
                  { v: String(TOTAL_CATEGORIAS), k: 'categorías' },
                  { v: String(TOTAL_ETIQUETAS), k: 'etiquetas' },
                ].map((s) => (
                  <div key={s.k}>
                    <dt className="sr-only">{s.k}</dt>
                    <dd className="font-display text-3xl font-bold text-cobalt-b">{s.v}</dd>
                    <dd className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{s.k}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Postales flotantes */}
          <div className="relative hidden h-[460px] lg:block" aria-hidden="true">
            {sorprendentes.slice(0, 3).map((c, i) => (
              <Link
                key={c.slug}
                to={`/curiosidad/${c.slug}`}
                tabIndex={-1}
                className={`postal absolute block w-64 overflow-hidden rounded-xl border border-line bg-card shadow-xl transition-transform duration-300 hover:z-20 hover:scale-[1.04] hover:!rotate-0 ${
                  i === 0 ? 'left-4 top-6 -rotate-6' : i === 1 ? 'left-40 top-32 rotate-3' : 'left-16 top-64 -rotate-2'
                }`}
                style={{ animationDelay: `${i * 1.4}s` }}
              >
                <div className="aspect-[16/10]">
                  <Cover c={c} decor={false} />
                </div>
                <p className="line-clamp-2 px-4 py-3 font-display text-sm font-semibold leading-snug">
                  {c.titulo}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Ticker />

      {/* ── CURIOSIDAD DEL DÍA ── */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6" aria-labelledby="titulo-del-dia">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-gold/35 bg-card shadow-lg">
            <div className="absolute inset-y-0 left-0 w-1.5 bg-gold" aria-hidden="true" />
            <div className="grid lg:grid-cols-[1.1fr_1.4fr]">
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[320px]">
                <Cover c={delDia} eager />
                <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#241a06]">
                  Curiosidad del día
                </span>
              </div>
              <div className="flex flex-col gap-4 p-7 sm:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
                  {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
                <h2 id="titulo-del-dia" className="font-display text-2xl font-bold leading-tight sm:text-[1.9rem]">
                  <Link to={`/curiosidad/${delDia.slug}`} className="transition-colors hover:text-cobalt-b">
                    {delDia.titulo}
                  </Link>
                </h2>
                <p className="text-[15px] leading-relaxed text-sub sm:text-base">{delDia.subtitulo}</p>
                <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
                  <Link to={`/curiosidad/${delDia.slug}`} className="btn btn-primary h-12 !px-6">
                    Descubrir
                    <Icono nombre="flecha" className="h-4 w-4" />
                  </Link>
                  <span className="font-mono text-xs text-faint">
                    Todos ven la misma curiosidad cada día · cambia a medianoche
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── CATEGORÍAS ── */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6" aria-labelledby="titulo-categorias">
        <EncabezadoSeccion
          kicker="El archivo"
          titulo="Explora por categoría"
          id="titulo-categorias"
          descripcion={`${TOTAL_CATEGORIAS} territorios del conocimiento. Cada uno con su propia página, en crecimiento continuo.`}
        />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIAS.map((cat, i) => (
            <Reveal key={cat.id} delay={Math.min(i * 40, 320)}>
              <Link
                to={`/categoria/${cat.slug}`}
                className="group flex h-full items-center gap-3.5 rounded-xl border border-line bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ ['--ac' as string]: cat.color }}
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  style={{ background: cat.color }}
                >
                  <Icono nombre={cat.id} className="h-5.5 w-5.5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold sm:text-[15px]">{cat.nombre}</span>
                  <span className="font-mono text-[11px] text-faint">
                    {conteoCategoria(cat.id) || 'pronto'} {conteoCategoria(cat.id) === 1 ? 'artículo' : 'artículos'}
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── LAS MÁS SORPRENDENTES ── */}
      <section className="pt-20" aria-labelledby="titulo-sorprendentes">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <EncabezadoSeccion
            kicker="Selección editorial"
            titulo="Las más sorprendentes"
            id="titulo-sorprendentes"
            descripcion="Las que más «no puede ser» han provocado. Desliza para verlas todas."
            accion={{ to: '/explorar', label: 'Explorar todo' }}
          />
        </div>
        <div className="scroll-row mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pl-[max(1rem,calc((100vw-80rem)/2+1rem))] pr-6">
          {sorprendentes.map((c, i) => (
            <div key={c.slug} className="w-[85vw] max-w-[380px] shrink-0 snap-start sm:w-[380px]">
              <CuriosidadCard c={c} indice={String(i + 1).padStart(2, '0')} />
            </div>
          ))}
        </div>
      </section>

      {/* ── ÚLTIMAS ── */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6" aria-labelledby="titulo-ultimas">
        <EncabezadoSeccion
          kicker="Recién publicadas"
          titulo="Últimas curiosidades"
          id="titulo-ultimas"
          descripcion="Lo último que ha entrado en la biblioteca, ordenado por fecha."
          accion={{ to: '/explorar', label: 'Ver todo el feed' }}
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ultimas.map((c, i) => (
            <Reveal key={c.slug} delay={Math.min(i * 60, 300)}>
              <CuriosidadCard c={c} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── EXPLORAR POR TEMAS (Curiomotor) ── */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6" aria-labelledby="titulo-temas">
        <EncabezadoSeccion
          kicker="El Curiomotor"
          titulo="Una curiosidad te lleva a otra"
          id="titulo-temas"
          descripcion="Etiquetas, personajes, lugares y épocas conectan todo el archivo. Tira de cualquier hilo."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <div className="rounded-xl border border-line bg-card p-6 sm:p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Etiquetas populares</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {etiquetas.map((t) => (
                  <Link
                    key={t.slug}
                    to={`/tag/${t.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3.5 py-1.5 text-sm text-sub transition-all hover:-translate-y-0.5 hover:border-cobalt hover:text-cobalt-b"
                  >
                    <Icono nombre="etiqueta" className="h-3.5 w-3.5" />
                    {t.etiqueta}
                    <span className="font-mono text-[10px] text-faint">{t.total}</span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="flex flex-col gap-6">
            {([
              { titulo: 'Personajes', lista: entidades.personas, icono: 'autor' as IconoNombre },
              { titulo: 'Lugares', lista: entidades.lugares, icono: 'geografia' as IconoNombre },
              { titulo: 'Épocas', lista: entidades.epocas, icono: 'historia' as IconoNombre },
            ]).map((grupo, gi) => (
              <Reveal key={grupo.titulo} delay={gi * 90}>
                <div className="rounded-xl border border-line bg-card p-6">
                  <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                    <Icono nombre={grupo.icono} className="h-4 w-4 text-cobalt-b" />
                    {grupo.titulo}
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {grupo.lista.slice(0, 8).map((e) => (
                      <Link
                        key={e.slug}
                        to={`/buscar?q=${encodeURIComponent(e.nombre)}`}
                        className="rounded-full bg-paper px-3 py-1 text-[13px] text-sub ring-1 ring-line transition-colors hover:text-cobalt-b hover:ring-cobalt"
                      >
                        {e.nombre}
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUIZZES + MAPAS ── */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6" aria-labelledby="titulo-quizzes">
        <EncabezadoSeccion
          kicker="Ponte a prueba"
          titulo="Quizzes para presumir de dato"
          id="titulo-quizzes"
          descripcion="Cada respuesta viene con su explicación. Ganes o pierdas, aprendes."
          accion={{ to: '/quizzes', label: 'Todos los quizzes' }}
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {QUIZZES.slice(0, 3).map((q, i) => {
            const cat = CATEGORIAS.find((c) => c.id === q.categoria)!;
            return (
              <Reveal key={q.slug} delay={i * 80}>
                <Link
                  to={`/quiz/${q.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-line bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg text-white" style={{ background: cat.color }}>
                      <Icono nombre="quiz" className="h-5.5 w-5.5" />
                    </span>
                    <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-faint">
                      {q.dificultad}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold transition-colors group-hover:text-cobalt-b">
                    {q.titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-sub">{q.descripcion}</p>
                  <p className="mt-auto flex items-center gap-2 pt-4 font-mono text-[11px] uppercase tracking-wider text-faint">
                    {q.preguntas.length} preguntas
                    <Icono nombre="flecha" className="h-4 w-4 text-cobalt-b transition-transform group-hover:translate-x-1" />
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Mapas curiosos — en desarrollo */}
        <div className="mt-16 grid gap-5 md:grid-cols-3" aria-label="Mapas curiosos, próximamente">
          <Reveal className="md:col-span-1">
            <div className="flex h-full flex-col justify-between rounded-xl border border-dashed border-line bg-card2 p-6">
              <div>
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                  <Icono nombre="mapa" className="h-4 w-4 text-cobalt-b" />
                  Próximamente
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold">Mapas curiosos</h3>
                <p className="mt-2 text-sm leading-relaxed text-sub">
                  Mapas históricos, mapas extraños y comparativas imposibles. Estamos dibujando el mundo raro,
                  literalmente.
                </p>
              </div>
              <div className="mt-5 flex gap-2">
                {['Históricos', 'Extraños', 'Interactivos'].map((m) => (
                  <span key={m} className="rounded-full bg-paper px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-faint ring-1 ring-line">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100} className="md:col-span-2">
            <div className="relative flex h-full min-h-[220px] items-center justify-center overflow-hidden rounded-xl border border-line bg-[#0a1226]">
              <MapaDecorativo />
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#0a1226]/80 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#9db4ff] backdrop-blur">
                Sección en construcción · llega pronto
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6" aria-labelledby="titulo-newsletter">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-line bg-[#0a1226] p-8 text-[#eef1fa] sm:p-12">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cobalt/25 blur-[90px]" aria-hidden="true" />
            <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-gold/15 blur-[80px]" aria-hidden="true" />
            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">Una curiosidad al día</p>
                <h2 id="titulo-newsletter" className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
                  Recibe una curiosidad que probablemente no conocías.
                </h2>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#aab6d6]">
                  La misma selección que la «Curiosidad del día», directamente en tu bandeja. Cero ruido,
                  una dosis diaria de asombro.
                </p>
              </div>
              <Newsletter />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function EncabezadoSeccion({
  kicker, titulo, descripcion, id, accion,
}: {
  kicker: string;
  titulo: string;
  descripcion: string;
  id: string;
  accion?: { to: string; label: string };
}) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cobalt-b">{kicker}</p>
          <h2 id={id} className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {titulo}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-sub">{descripcion}</p>
        </div>
        {accion && (
          <Link to={accion.to} className="btn btn-ghost h-11">
            {accion.label}
            <Icono nombre="flecha" className="h-4 w-4" />
          </Link>
        )}
      </div>
    </Reveal>
  );
}

function MapaDecorativo() {
  return (
    <svg viewBox="0 0 800 300" className="h-full w-full opacity-70" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <g fill="none" stroke="#2b50e0" strokeOpacity="0.5" strokeWidth="1">
        {Array.from({ length: 16 }).map((_, i) => (
          <path key={`h${i}`} d={`M0 ${i * 20} H 800`} strokeOpacity={0.08 + (i % 4) * 0.04} />
        ))}
        {Array.from({ length: 26 }).map((_, i) => (
          <path key={`v${i}`} d={`M${i * 32} 0 V 300`} strokeOpacity={0.08 + (i % 5) * 0.03} />
        ))}
      </g>
      <g fill="none" stroke="#4d6fff" strokeWidth="1.6" strokeOpacity="0.8">
        <path d="M80 210 Q 180 90 330 130 T 620 90" strokeDasharray="2 7" />
        <path d="M140 250 Q 300 160 470 210 T 740 150" strokeDasharray="2 7" strokeOpacity="0.5" />
      </g>
      {[
        [80, 210], [330, 130], [620, 90], [140, 250], [470, 210], [740, 150],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="4" fill="#e8a33c" />
          <circle cx={x} cy={y} r="9" fill="none" stroke="#e8a33c" strokeOpacity="0.5" />
        </g>
      ))}
      <text x="92" y="196" fill="#9db4ff" fontSize="13" fontFamily="Spline Sans Mono, monospace">38.7223° N</text>
      <text x="632" y="76" fill="#9db4ff" fontSize="13" fontFamily="Spline Sans Mono, monospace">¿?</text>
    </svg>
  );
}
