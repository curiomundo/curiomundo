import { CATEGORIAS } from '../data/categorias';
import { aleatoria } from '../lib/content';
import { Link, navegar } from '../lib/router';
import { Icono, Logo } from './Icons';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-card">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" aria-label="Curiomundo — inicio" className="inline-block">
            <Logo />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-sub">
            La biblioteca infinita de curiosidades en español. Entras por una curiosidad y acabas
            descubriendo diez.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.tiktok.com/@curiomundotk"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label="Curiomundo en TikTok"
              title="TikTok"
            >
              <Icono nombre="tiktok" className="h-4.5 w-4.5" />
            </a>
            <a href="mailto:curiomundotk@gmail.com" className="icon-btn" aria-label="Escribir un correo a Curiomundo" title="Email">
              <Icono nombre="correo" className="h-4.5 w-4.5" />
            </a>
            <span className="font-mono text-xs text-faint">curiomundotk@gmail.com</span>
          </div>
        </div>

        <nav aria-label="Explorar">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Descubrir</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            <li><Link to="/" className="foot-link">Inicio</Link></li>
            <li><Link to="/explorar" className="foot-link">Explorar todo</Link></li>
            <li><Link to="/quizzes" className="foot-link">Quizzes</Link></li>
            <li><Link to="/favoritos" className="foot-link">Mis favoritos</Link></li>
            <li>
              <button
                type="button"
                onClick={() => navegar(`/curiosidad/${aleatoria().slug}`)}
                className="foot-link inline-flex items-center gap-2 text-cobalt-b"
              >
                <Icono nombre="dado" className="h-4 w-4" />
                Sorpréndeme
              </button>
            </li>
          </ul>
        </nav>

        <nav aria-label="Categorías destacadas">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Categorías</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {CATEGORIAS.slice(0, 7).map((cat) => (
              <li key={cat.id}>
                <Link to={`/categoria/${cat.slug}`} className="foot-link inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: cat.color }} aria-hidden="true" />
                  {cat.nombre}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/explorar" className="foot-link inline-flex items-center gap-1.5 font-semibold text-cobalt-b">
                Ver las {CATEGORIAS.length}
                <Icono nombre="flecha" className="h-3.5 w-3.5" />
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Información">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Curiomundo</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            <li><Link to="/sobre" className="foot-link">Sobre Curiomundo</Link></li>
            <li><Link to="/contacto" className="foot-link">Contacto</Link></li>
            <li><Link to="/privacidad" className="foot-link">Privacidad</Link></li>
            <li><Link to="/cookies" className="foot-link">Cookies</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-faint sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Curiomundo · Hecho con curiosidad, en español de España.</p>
          <p className="inline-flex items-center gap-2 font-mono">
            <Icono nombre="chispa" className="h-3.5 w-3.5 text-gold" />
            Entras por una. Acabas descubriendo diez.
          </p>
        </div>
      </div>
    </footer>
  );
}
