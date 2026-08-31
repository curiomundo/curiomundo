import { useEffect, useRef, useState } from 'react';
import { CATEGORIAS } from '../data/categorias';
import { aleatoria, conteoCategoria } from '../lib/content';
import { Link, navegar, useRuta } from '../lib/router';
import { useApp } from '../lib/store';
import { Icono, Logo } from './Icons';
import { SearchPanel } from './SearchPanel';

export function Header() {
  const ruta = useRuta();
  const { tema, alternarTema } = useApp();
  const [busquedaAbierta, setBusquedaAbierta] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [categoriasAbiertas, setCategoriasAbiertas] = useState(false);
  const [rodando, setRodando] = useState(false);
  const dropRef = useRef<HTMLDivElement | null>(null);

  /* Atajos de teclado: Ctrl/Cmd+K o «/» abren el buscador */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const objetivo = e.target as HTMLElement | null;
      const escribiendo =
        objetivo && (objetivo.tagName === 'INPUT' || objetivo.tagName === 'TEXTAREA' || objetivo.isContentEditable);
      if ((e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !escribiendo)) {
        e.preventDefault();
        setBusquedaAbierta((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* Cerrar el desplegable de categorías al hacer clic fuera */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setCategoriasAbiertas(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  /* Cerrar menús al navegar */
  const claveRuta = ruta.segmentos.join('/') + ruta.query.toString();
  useEffect(() => {
    setMenuAbierto(false);
    setCategoriasAbiertas(false);
  }, [claveRuta]);

  useEffect(() => {
    document.body.style.overflow = menuAbierto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuAbierto]);

  const sorprender = () => {
    setRodando(true);
    window.setTimeout(() => {
      setRodando(false);
      setMenuAbierto(false);
      navegar(`/curiosidad/${aleatoria().slug}`);
    }, 380);
  };

  const activo = (seg: string) => ruta.segmentos[0] === seg;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
          <Link to="/" aria-label="Curiomundo — inicio" className="shrink-0 transition-opacity hover:opacity-80">
            <Logo compacto />
          </Link>
          <span className="ml-1 hidden font-display text-lg font-semibold tracking-tight lg:inline">
            Curiomundo
          </span>

          <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
            <div className="relative" ref={dropRef}>
              <button
                type="button"
                onClick={() => setCategoriasAbiertas((v) => !v)}
                aria-expanded={categoriasAbiertas}
                className={`nav-link ${categoriasAbiertas || activo('categoria') ? 'text-ink' : ''}`}
              >
                Categorías
                <Icono nombre="flecha" className={`h-3.5 w-3.5 rotate-90 transition-transform ${categoriasAbiertas ? '-rotate-90' : ''}`} />
              </button>
              {categoriasAbiertas && (
                <div className="panel-in absolute left-0 top-full mt-2 w-[560px] rounded-xl border border-line bg-card p-3 shadow-2xl">
                  <div className="grid grid-cols-2 gap-1">
                    {CATEGORIAS.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/categoria/${cat.slug}`}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-paper"
                      >
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white"
                          style={{ background: cat.color }}
                        >
                          <Icono nombre={cat.id} className="h-4.5 w-4.5" />
                        </span>
                        <span className="flex-1 text-sm font-medium">{cat.nombre}</span>
                        <span className="font-mono text-[11px] text-faint">{conteoCategoria(cat.id)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link to="/explorar" className={`nav-link ${activo('explorar') ? 'text-ink' : ''}`}>
              Explorar
            </Link>
            <Link to="/quizzes" className={`nav-link ${activo('quizzes') || activo('quiz') ? 'text-ink' : ''}`}>
              Quizzes
            </Link>
            <Link to="/sobre" className={`nav-link ${activo('sobre') ? 'text-ink' : ''}`}>
              Sobre
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setBusquedaAbierta(true)}
              className="btn btn-ghost h-10 hidden !gap-2.5 sm:inline-flex"
              aria-label="Abrir buscador"
            >
              <Icono nombre="buscar" className="h-4.5 w-4.5" />
              <span className="hidden md:inline">Buscar</span>
              <kbd className="hidden rounded border border-line bg-paper px-1.5 py-0.5 font-mono text-[10px] text-faint xl:inline">
                Ctrl K
              </kbd>
            </button>
            <button
              type="button"
              onClick={() => setBusquedaAbierta(true)}
              className="icon-btn sm:hidden"
              aria-label="Abrir buscador"
            >
              <Icono nombre="buscar" className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={alternarTema}
              className="icon-btn"
              aria-label={tema === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
              title={tema === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            >
              <Icono nombre={tema === 'dark' ? 'sol' : 'luna'} className="h-5 w-5" />
            </button>

            <button type="button" onClick={sorprender} className="btn btn-primary h-10 hidden !px-4 md:inline-flex">
              <span className={rodando ? 'dice-roll inline-flex' : 'inline-flex'}>
                <Icono nombre="dado" className="h-4.5 w-4.5" />
              </span>
              Sorpréndeme
            </button>

            <button
              type="button"
              onClick={() => setMenuAbierto(true)}
              className="icon-btn lg:hidden"
              aria-label="Abrir menú"
              aria-expanded={menuAbierto}
            >
              <Icono nombre="menu" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      {menuAbierto && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menú">
          <button
            type="button"
            className="absolute inset-0 h-full w-full bg-[#05080f]/70 backdrop-blur-[2px]"
            onClick={() => setMenuAbierto(false)}
            aria-label="Cerrar menú"
          />
          <div className="drawer-in absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto border-l border-line bg-paper">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Logo compacto />
              <button type="button" onClick={() => setMenuAbierto(false)} className="icon-btn" aria-label="Cerrar menú">
                <Icono nombre="cerrar" className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Navegación móvil">
              {[
                { to: '/', label: 'Inicio', icon: 'inicio' as const },
                { to: '/explorar', label: 'Explorar', icon: 'infinito' as const },
                { to: '/quizzes', label: 'Quizzes', icon: 'quiz' as const },
                { to: '/favoritos', label: 'Mis favoritos', icon: 'corazon' as const },
                { to: '/sobre', label: 'Sobre Curiomundo', icon: 'libro' as const },
                { to: '/contacto', label: 'Contacto', icon: 'correo' as const },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] font-medium transition-colors hover:bg-card">
                  <Icono nombre={l.icon} className="h-5 w-5 text-cobalt-b" />
                  {l.label}
                </Link>
              ))}
              <button type="button" onClick={sorprender} className="btn btn-primary mt-3 h-12 justify-center">
                <span className={rodando ? 'dice-roll inline-flex' : 'inline-flex'}>
                  <Icono nombre="dado" className="h-5 w-5" />
                </span>
                Sorpréndeme
              </button>
            </nav>
            <div className="mt-auto border-t border-line px-4 py-5">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Categorías</p>
              <div className="grid grid-cols-2 gap-1.5">
                {CATEGORIAS.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/categoria/${cat.slug}`}
                    className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors hover:bg-card"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: cat.color }} aria-hidden="true" />
                    {cat.nombre}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <SearchPanel abierto={busquedaAbierta} onCerrar={() => setBusquedaAbierta(false)} />
    </>
  );
}
