import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

/* Estado global ligero: tema claro/oscuro y favoritos (localStorage). */

type Tema = 'light' | 'dark';

interface AppCtx {
  tema: Tema;
  alternarTema: () => void;
  favoritos: string[];
  esFavorito: (slug: string) => boolean;
  alternarFavorito: (slug: string) => void;
}

const Ctx = createContext<AppCtx | null>(null);

function leerFavoritos(): string[] {
  try {
    const crudo = localStorage.getItem('cm:favoritos');
    const arr = crudo ? (JSON.parse(crudo) as unknown) : [];
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [tema, setTema] = useState<Tema>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  );
  const [favoritos, setFavoritos] = useState<string[]>(leerFavoritos);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'dark');
    try {
      localStorage.setItem('cm:tema', tema);
    } catch { /* almacenamiento no disponible */ }
  }, [tema]);

  useEffect(() => {
    try {
      localStorage.setItem('cm:favoritos', JSON.stringify(favoritos));
    } catch { /* almacenamiento no disponible */ }
  }, [favoritos]);

  const alternarTema = useCallback(() => setTema((t) => (t === 'dark' ? 'light' : 'dark')), []);

  const esFavorito = useCallback((slug: string) => favoritos.includes(slug), [favoritos]);

  const alternarFavorito = useCallback((slug: string) => {
    setFavoritos((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  return (
    <Ctx.Provider value={{ tema, alternarTema, favoritos, esFavorito, alternarFavorito }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp(): AppCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp debe usarse dentro de <AppProvider>');
  return ctx;
}
