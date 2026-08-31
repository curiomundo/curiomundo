# 🪐 Curiomundo

**La biblioteca infinita de curiosidades en español.**

Curiomundo es una plataforma de contenido y descubrimiento: artículos de curiosidades sobre historia,
ciencia, espacio, misterios, animales y mucho más, con buscador instantáneo, categorías, etiquetas,
quizzes, favoritos, «Curiosidad del día» y un botón **Sorpréndeme** que nunca repite.

> Entras por una curiosidad y acabas descubriendo diez.

Sitio 100 % estático: sin servidores, sin bases de datos, sin APIs de pago. Preparado para desplegarse
gratis en **GitHub Pages**.

---

## ✨ Qué incluye (v1)

| Función | Estado |
|---|---|
| Portada editorial (hero, curiosidad del día, destacadas, últimas) | ✅ |
| Buscador instantáneo (Ctrl/Cmd + K o `/`) con fragmentos resaltados | ✅ |
| Botón «Sorpréndeme» (aleatorio real, sin repetir la última) | ✅ |
| 21 curiosidades de ejemplo con fuentes verificables | ✅ |
| 16 categorías con página, descripción, contador y paginación | ✅ |
| Etiquetas con páginas automáticas (`#/tag/…`) | ✅ |
| Artículos con bloques ricos: datos clave, citas, listas, tablas | ✅ |
| **Curiomotor**: relacionados por categoría, etiquetas y entidades | ✅ |
| Entidades (personas, lugares, épocas) conectadas a la búsqueda | ✅ |
| Quizzes con explicación por respuesta y puntuación final | ✅ |
| Favoritos con `localStorage` (sin cuentas) | ✅ |
| Compartir: Web Share API / WhatsApp / X / Facebook / copiar enlace | ✅ |
| Modo oscuro (sistema + manual, sin destello blanco) | ✅ |
| SEO por ruta: title, description, canonical, OG, Twitter, JSON-LD | ✅ |
| RSS, sitemap, robots.txt, manifest (base PWA) | ✅ |
| `404` profesional, estados vacíos cuidados | ✅ |
| Newsletter (componente listo, guardado local) | ✅ |
| Validación anti-duplicados de slugs y títulos | ✅ |
| Script generador de plantillas de curiosidades | ✅ |

## 🛠 Tecnología

- **React 18 + TypeScript estricto + Vite 6** → build 100 % estático.
- **Tailwind CSS 4** para el sistema de diseño.
- **Enrutado por hash** (`#/curiosidad/…`): funciona en GitHub Pages sin configuración adicional,
  sin errores 404 al recargar y sin `base path` que romper.
- Tipografías: **Fraunces** (titulares) + **Instrument Sans** (cuerpo) + **Spline Sans Mono** (datos).
- Sin dependencias de runtime añadidas: iconos SVG propios, buscador propio, animaciones CSS propias.

## 🚀 Empezar en local

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo (http://localhost:3000)
npm run dev

# 3. Comprobación de tipos
npm run typecheck

# 4. Build de producción (carpeta dist/)
npm run build

# 5. Ver el build en local
npm run preview
```

## 📝 Añadir una curiosidad nueva

Opción rápida (plantilla generada):

```bash
node scripts/new-curiosidad.mjs "El faro que funcionaba con fuego de leña" historia
```

Después:

1. Abre el archivo generado en `src/data/nueva-curiosidad-*.ts` y complétalo.
2. Pega el objeto dentro del array `CURIOSIDADES` en `src/data/curiosidades.ts`.
3. Borra el archivo de plantilla.

Todo lo demás es automático: la página del artículo, su buscador, sus relacionados, su etiqueta,
su contador de categoría y su «curiosidad del día» futura.

### Reglas de contenido

- **Slug y título únicos** (la app avisa en consola si hay duplicados).
- **Fuentes reales**: estudios con DOI, museos, observatorios. Nunca inventes URLs.
- Español de España (`es-ES`). Párrafos cortos, datos clave, sin clickbait.

## 🗂 Estructura del proyecto

```
curiomundo/
├── .github/workflows/deploy.yml   # Despliegue automático en GitHub Pages
├── public/                        # favicon, robots, sitemap, rss, manifest
├── scripts/new-curiosidad.mjs     # Generador de plantillas
├── src/
│   ├── components/                # Header, Footer, tarjetas, buscador, iconos…
│   ├── data/                      # Contenido: curiosidades, categorías, quizzes
│   ├── lib/                       # Router, buscador, SEO, Curiomotor, store
│   ├── pages/                     # Home, Articulo, Categoria, Quizzes…
│   ├── App.tsx                    # Enrutado y shell
│   └── index.css                  # Sistema de diseño (tokens claro/oscuro)
├── README.md
└── DEPLOY.md                      # Guía paso a paso de GitHub Pages
```

## 🔮 Preparado para crecer (hoja de ruta)

La arquitectura está pensada para pasar de 21 a **10.000+ curiosidades** sin rehacer nada:

- Contenido tipado y centralizado → añadir artículos = añadir objetos.
- Buscador con índice ponderado (título > tags > entidades > cuerpo).
- Personajes (`#/buscar?q=Einstein` hoy; páginas propias mañana), países y mapas curiosos.
- Gamificación (puntos, rachas, logros) sobre la base de favoritos ya existente.
- Generación asistida por IA **siempre con revisión humana** antes de publicar.
- Analítica respetuosa (Plausible/Umami) sin tocar la aplicación.

## 🧭 Solución de problemas

| Problema | Solución |
|---|---|
| `npm install` falla | Usa Node 20 LTS o superior (`node -v`). |
| Página en blanco en GitHub Pages | En Settings → Pages, la fuente debe ser **GitHub Actions**. |
| El tema parpadea al cargar | Comprueba que el script inicial de `index.html` sigue presente. |
| Duplicados de contenido | Mira la consola: la app lista slugs/títulos repetidos al arrancar. |

## 📮 Contacto

Curiomundo nace de una comunidad de TikTok: [@curiomundotk](https://www.tiktok.com/@curiomundotk) ·
[curiomundotk@gmail.com](mailto:curiomundotk@gmail.com)
