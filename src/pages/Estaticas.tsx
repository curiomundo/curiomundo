import { useMemo } from 'react';
import { aleatoria, TOTAL_CATEGORIAS, TOTAL_CURIOSIDADES, TOTAL_ETIQUETAS } from '../lib/content';
import { aplicarMeta, jsonldBase } from '../lib/meta';
import { Link, navegar } from '../lib/router';
import { Icono } from '../components/Icons';
import { Reveal } from '../components/Reveal';
import { Newsletter } from '../components/Bits';

/* ── 404 ─────────────────────────────────────────────────────────── */

export function PaginaNoEncontrada() {
  useMemo(() => {
    aplicarMeta({
      titulo: 'Página no encontrada — Curiomundo',
      descripcion: 'Esta curiosidad parece haberse perdido en el universo.',
      ruta: '404',
      noindex: true,
      jsonld: jsonldBase(),
    });
  }, []);

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6">
      <div className="relative">
        <p className="font-display text-[7rem] font-black leading-none text-cobalt-b/15 sm:text-[9rem]" aria-hidden="true">
          404
        </p>
        <Icono nombre="espacio" className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-cobalt-b" />
      </div>
      <h1 className="mt-6 font-display text-3xl font-black tracking-tight sm:text-4xl">
        Esta curiosidad parece haberse perdido en el universo.
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-sub">
        La página que buscas no existe (o todavía no la hemos descubierto). El resto del archivo sigue
        intacto, y el azar está de tu lado.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn btn-primary h-12 !px-6">
          <Icono nombre="inicio" className="h-4.5 w-4.5" />
          Volver al inicio
        </Link>
        <button type="button" onClick={() => navegar(`/curiosidad/${aleatoria().slug}`)} className="btn btn-gold h-12 !px-6">
          <Icono nombre="dado" className="h-4.5 w-4.5" />
          Sorpréndeme
        </button>
      </div>
    </div>
  );
}

/* ── Sobre ───────────────────────────────────────────────────────── */

export function Sobre() {
  useMemo(() => {
    aplicarMeta({
      titulo: 'Sobre Curiomundo — La biblioteca infinita de curiosidades',
      descripcion:
        'Qué es Curiomundo, cómo trabajamos y hacia dónde vamos: una biblioteca de curiosidades en español pensada para crecer hasta decenas de miles de artículos.',
      ruta: 'sobre',
      jsonld: jsonldBase(),
    });
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 pt-12 sm:px-6">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cobalt-b">Manifiesto</p>
        <h1 className="mt-3 font-display text-4xl font-black leading-tight tracking-tight sm:text-5xl">
          Entras por una curiosidad.<br />Acabas descubriendo diez.
        </h1>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-8 flex flex-col gap-6 text-[1.05rem] leading-[1.75] text-ink/90">
          <p>
            Curiomundo nace de una comunidad de TikTok obsesionada con una pregunta sencilla:{' '}
            <strong>¿y esto por qué?</strong> Los vídeos duran un minuto; la curiosidad que despiertan
            dura mucho más. Esta web es el lugar donde esa curiosidad se puede satisfacer a fondo.
          </p>
          <p>
            No somos una enciclopedia: no pretendemos ser exhaustivos. Somos una{' '}
            <strong>biblioteca de asombro</strong>: cada artículo existe porque alguien, al leerlo, va a
            soltar un «no puede ser». Y después va a querer otro.
          </p>
        </div>
      </Reveal>

      <Reveal delay={180}>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { v: String(TOTAL_CURIOSIDADES), k: 'curiosidades hoy', d: 'El objetivo: 10.000+. La arquitectura ya está lista.' },
            { v: String(TOTAL_CATEGORIAS), k: 'categorías vivas', d: 'De la historia al fondo del mar. Y las que faltan.' },
            { v: String(TOTAL_ETIQUETAS), k: 'etiquetas conectadas', d: 'El Curiomotor: cada dato tira de otros datos.' },
          ].map((s) => (
            <div key={s.k} className="rounded-xl border border-line bg-card p-6">
              <p className="font-display text-4xl font-black text-cobalt-b">{s.v}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{s.k}</p>
              <p className="mt-3 text-sm leading-relaxed text-sub">{s.d}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={220}>
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold">Cómo se hace una curiosidad</h2>
          <ol className="mt-6 flex flex-col gap-5">
            {[
              { t: 'La idea', d: 'Un dato que sorprende de verdad, no clickbait. Si no provoca un «¿en serio?», no entra.' },
              { t: 'La investigación', d: 'Fuentes primarias cuando existen: estudios publicados, museos, observatorios. Nada de «se dice que».' },
              { t: 'La escritura', d: 'Párrafos cortos, datos clave, contexto. Pensado para quien llega de un vídeo de un minuto y quiere más.' },
              { t: 'La conexión', d: 'Etiquetas, personajes, lugares y épocas: cada artículo abre caminos hacia otros diez.' },
              { t: 'La revisión', d: 'Toda asistencia de IA pasa siempre por revisión humana antes de publicarse. Los errores se corrigen y se avisa.' },
            ].map((paso, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cobalt font-mono text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{paso.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-sub">{paso.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </Reveal>

      <Reveal delay={260}>
        <div className="mt-14 rounded-2xl border border-line bg-card p-7 sm:p-9">
          <h2 className="font-display text-2xl font-bold">¿Quieres participar?</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-sub">
            ¿Detectaste un error? ¿Conoces una curiosidad que merece estar aquí? Escríbenos:{' '}
            <a href="mailto:curiomundotk@gmail.com" className="font-semibold text-cobalt-b underline underline-offset-2">
              curiomundotk@gmail.com
            </a>
            . Las mejores propuestas se acreditan en el artículo.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/explorar" className="btn btn-primary h-12">
              Empezar a explorar
              <Icono nombre="flecha" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/* ── Contacto ────────────────────────────────────────────────────── */

export function Contacto() {
  useMemo(() => {
    aplicarMeta({
      titulo: 'Contacto — Curiomundo',
      descripcion: 'Escríbenos a curiomundotk@gmail.com: correcciones, propuestas de curiosidades o colaboraciones.',
      ruta: 'contacto',
      jsonld: jsonldBase(),
    });
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 pt-12 sm:px-6">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cobalt-b">Hablemos</p>
        <h1 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl">Contacto</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-sub">
          Correcciones, curiosidades que deberíamos contar, colaboraciones o simplemente un «este dato
          me explotó la cabeza»: todo se lee.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <a
          href="mailto:curiomundotk@gmail.com?subject=Una%20curiosidad%20para%20Curiomundo"
          className="group mt-8 flex items-center gap-5 rounded-2xl border border-line bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-cobalt/50 hover:shadow-xl sm:p-8"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-cobalt text-white transition-transform group-hover:scale-110 group-hover:-rotate-6">
            <Icono nombre="correo" className="h-7 w-7" />
          </span>
          <span>
            <span className="block font-display text-xl font-bold">curiomundotk@gmail.com</span>
            <span className="mt-1 block text-sm text-sub">Pulsa para escribirnos · respondemos a todo</span>
          </span>
          <Icono nombre="flecha" className="ml-auto h-5 w-5 shrink-0 text-faint transition-transform group-hover:translate-x-1 group-hover:text-cobalt-b" />
        </a>
      </Reveal>

      <Reveal delay={180}>
        <a
          href="https://www.tiktok.com/@curiomundotk"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-4 flex items-center gap-5 rounded-2xl border border-line bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-cobalt/50 hover:shadow-xl sm:p-8"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#0a1226] text-white transition-transform group-hover:scale-110 group-hover:rotate-6">
            <Icono nombre="tiktok" className="h-7 w-7" />
          </span>
          <span>
            <span className="block font-display text-xl font-bold">@curiomundotk en TikTok</span>
            <span className="mt-1 block text-sm text-sub">Donde empezó todo: curiosidades de un minuto</span>
          </span>
          <Icono nombre="externo" className="ml-auto h-5 w-5 shrink-0 text-faint transition-transform group-hover:translate-x-1 group-hover:text-cobalt-b" />
        </a>
      </Reveal>
    </div>
  );
}

/* ── Privacidad y Cookies (plantillas claramente identificadas) ──── */

function PlantillaLegal({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  useMemo(() => {
    aplicarMeta({
      titulo: `${titulo} — Curiomundo`,
      descripcion: `Política de ${titulo.toLowerCase()} de Curiomundo.`,
      ruta: titulo === 'Privacidad' ? 'privacidad' : 'cookies',
      jsonld: jsonldBase(),
    });
  }, [titulo]);

  return (
    <div className="mx-auto max-w-3xl px-4 pt-12 sm:px-6">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cobalt-b">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-black tracking-tight">{titulo}</h1>
        <div className="mt-4 rounded-xl border border-gold/50 bg-gold/10 p-4 text-sm leading-relaxed">
          <strong>Aviso:</strong> este texto es una <em>plantilla informativa</em> pendiente de revisión
          legal definitiva. No constituye asesoramiento jurídico.
        </div>
      </Reveal>
      <Reveal delay={100}>
        <div className="mt-8 flex flex-col gap-5 text-[15px] leading-[1.75] text-ink/90">{children}</div>
      </Reveal>
    </div>
  );
}

export function Privacidad() {
  return (
    <PlantillaLegal titulo="Privacidad">
      <section>
        <h2 className="font-display text-2xl font-bold">En resumen</h2>
        <p className="mt-3">
          Curiomundo es un sitio estático. <strong>No tenemos servidores propios, no exigimos cuentas y no
          vendemos datos</strong>, porque no recopilamos datos personales identificables.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl font-bold">Qué guardamos y dónde</h2>
        <p className="mt-3">Algunas funciones usan el almacenamiento local de tu navegador (localStorage):</p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Tu preferencia de tema (claro u oscuro).</li>
          <li>Tus curiosidades favoritas.</li>
          <li>Tu correo, únicamente si decides suscribirte al boletín.</li>
        </ul>
        <p className="mt-3">
          Esa información no sale de tu dispositivo: puedes borrarla cuando quieras limpiando los datos
          del sitio en tu navegador.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl font-bold">Analítica</h2>
        <p className="mt-3">
          Actualmente no usamos rastreadores invasivos. Si en el futuro añadimos medición, será con una
          solución respetuosa (por ejemplo, agregada y sin cookies de seguimiento) y se actualizará esta
          página.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl font-bold">Contacto</h2>
        <p className="mt-3">
          Para cualquier duda sobre privacidad:{' '}
          <a href="mailto:curiomundotk@gmail.com" className="font-semibold text-cobalt-b underline underline-offset-2">
            curiomundotk@gmail.com
          </a>
          .
        </p>
      </section>
    </PlantillaLegal>
  );
}

export function Cookies() {
  return (
    <PlantillaLegal titulo="Cookies">
      <section>
        <h2 className="font-display text-2xl font-bold">En resumen</h2>
        <p className="mt-3">
          Curiomundo <strong>no utiliza cookies de seguimiento ni publicitarias</strong>. Las únicas
          preferencias que se recuerdan (tema, favoritos, suscripción) se guardan en el almacenamiento
          local del navegador, no en cookies.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl font-bold">¿Y si cambia?</h2>
        <p className="mt-3">
          Si en el futuro se incorporan servicios que usen cookies (por ejemplo, analítica agregada), se
          mostrará un aviso claro y se actualizará esta página explicando qué se usa y para qué. Nada de
          letras pequeñas.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl font-bold">Cómo borrar los datos guardados</h2>
        <p className="mt-3">
          En cualquier navegador: ajustes → privacidad → borrar datos del sitio. Con eso desaparecen tema,
          favoritos y suscripción almacenados en este dispositivo.
        </p>
      </section>
    </PlantillaLegal>
  );
}

/* ── Redirección «Sorpréndeme» (#/sorprendeme) ───────────────────── */

export function SorprendemeRedirect() {
  useMemo(() => {
    navegar(`/curiosidad/${aleatoria().slug}`, true);
  }, []);
  return null;
}
