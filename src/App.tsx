import React, { useEffect } from 'react';
import { AppProvider } from './lib/store';
import { useRuta } from './lib/router';
import { comprobarIntegridad } from './data/curiosidades';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Articulo } from './pages/Articulo';
import { Categoria } from './pages/Categoria';
import { Etiqueta } from './pages/Etiqueta';
import { Explorar } from './pages/Explorar';
import { Buscar } from './pages/Buscar';
import { Quizzes } from './pages/Quizzes';
import { QuizJugar } from './pages/QuizJugar';
import { Favoritos } from './pages/Favoritos';
import {
  Contacto, Cookies, PaginaNoEncontrada, Privacidad, Sobre, SorprendemeRedirect,
} from './pages/Estaticas';

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}

function Shell() {
  const ruta = useRuta();
  const clave = ruta.segmentos.join('/');

  /* Volver arriba en cada navegación */
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [clave]);

  /* Validación de contenido: slugs y títulos duplicados (avisa en consola) */
  useEffect(() => {
    const avisos = comprobarIntegridad();
    if (avisos.length > 0) {
      console.warn('[Curiomundo] Revisa el contenido:', avisos);
    }
  }, []);

  const [seccion, param] = ruta.segmentos;
  let pagina: React.ReactNode;
  switch (seccion) {
    case undefined:
      pagina = <Home />;
      break;
    case 'curiosidad':
      pagina = <Articulo slug={param ?? ''} />;
      break;
    case 'categoria':
      pagina = <Categoria slug={param ?? ''} />;
      break;
    case 'tag':
      pagina = <Etiqueta slug={param ?? ''} />;
      break;
    case 'explorar':
      pagina = <Explorar />;
      break;
    case 'buscar':
      pagina = <Buscar consultaInicial={ruta.query.get('q') ?? ''} />;
      break;
    case 'quizzes':
      pagina = <Quizzes />;
      break;
    case 'quiz':
      pagina = <QuizJugar slug={param ?? ''} />;
      break;
    case 'favoritos':
      pagina = <Favoritos />;
      break;
    case 'sobre':
      pagina = <Sobre />;
      break;
    case 'contacto':
      pagina = <Contacto />;
      break;
    case 'privacidad':
      pagina = <Privacidad />;
      break;
    case 'cookies':
      pagina = <Cookies />;
      break;
    case 'sorprendeme':
      pagina = <SorprendemeRedirect />;
      break;
    default:
      pagina = <PaginaNoEncontrada />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" key={clave} className="flex-1">
        {pagina}
      </main>
      <Footer />
    </div>
  );
}
