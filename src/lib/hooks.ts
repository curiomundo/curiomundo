import { useEffect, useRef, useState } from 'react';

/* ── prefers-reduced-motion ──────────────────────────────────────── */

export function useReducedMotion(): boolean {
  const [reducido, setReducido] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducido(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reducido;
}

/* ── Aparición al hacer scroll ───────────────────────────────────── */

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entradas) => {
        if (entradas[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -36px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Efecto «decodificación» para titulares ──────────────────────── */

const GLIFOS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ*·?¿!%#';

export function useScramble(texto: string): string {
  const reducido = useReducedMotion();
  const [salida, setSalida] = useState(reducido ? texto : texto.replace(/\S/g, '\u00A0'));
  useEffect(() => {
    if (reducido) {
      setSalida(texto);
      return;
    }
    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame += 1;
      const fijados = Math.floor((frame / 3) - 4);
      if (fijados >= texto.length) {
        setSalida(texto);
        return;
      }
      let s = '';
      for (let i = 0; i < texto.length; i++) {
        const c = texto[i];
        if (c === ' ') s += ' ';
        else if (i < fijados) s += c;
        else s += GLIFOS[Math.floor(Math.random() * GLIFOS.length)];
      }
      setSalida(s);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [texto, reducido]);
  return salida;
}

/* ── Progreso de lectura (artículos) ─────────────────────────────── */

export function useProgreso(): number {
  const [progreso, setProgreso] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgreso(total > 0 ? Math.min(1, window.scrollY / total) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progreso;
}
