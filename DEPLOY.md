# 🚀 Publicar Curiomundo en GitHub Pages (paso a paso)

Esta guía asume que no has publicado nada antes. Tiempo total: ~10 minutos.

## 1. Crear el repositorio en GitHub

1. Entra en [github.com/new](https://github.com/new).
2. Nombre del repositorio: `curiomundo` (o el que prefieras).
3. Déjalo **público** (GitHub Pages gratis requiere repositorio público).
4. **No** marques «Add a README» (ya lo traes del proyecto).
5. Pulsa **Create repository**.

## 2. Subir el proyecto

Desde la carpeta del proyecto, en tu terminal:

```bash
git init
git add .
git commit -m "Curiomundo v1"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/curiomundo.git
git push -u origin main
```

> Sustituye `TU-USUARIO` por tu nombre de usuario de GitHub.

## 3. Configurar GitHub Pages

1. En tu repositorio: **Settings** → **Pages** (menú lateral izquierdo).
2. En **Source**, selecciona **GitHub Actions**.
3. No toques nada más: el workflow del proyecto hace el resto.

## 4. Activar el despliegue (GitHub Actions)

El archivo `.github/workflows/deploy.yml` ya está en el proyecto. Cuando hiciste el `push` del paso 2,
GitHub lanzó automáticamente el workflow:

1. Ve a la pestaña **Actions** del repositorio.
2. Verás el workflow «Desplegar en GitHub Pages» ejecutándose (build + typecheck + deploy).
3. Cuando el punto se ponga verde ✅, tu web está publicada.

## 5. Abrir tu web

Tu Curiomundo vive en:

```
https://TU-USUARIO.github.io/curiomundo/
```

## 6. Actualizar el sitio

Cada `git push` a `main` republica automáticamente:

```bash
git add .
git commit -m "Nueva curiosidad: …"
git push
```

## 🌐 Usar un dominio propio (curiomundo.com)

Cuando tengas dominio:

1. **Settings → Pages → Custom domain** → escribe `curiomundo.com` → Save.
2. En tu proveedor de dominio crea estos registros DNS:
   - `A` → `185.199.108.153`
   - `A` → `185.199.109.153`
   - `A` → `185.199.110.153`
   - `A` → `185.199.111.153`
   - `CNAME` → `TU-USUARIO.github.io` (para `www`)
3. Marca **Enforce HTTPS** cuando esté disponible (tarda unos minutos).

**No hay que reconstruir nada**: Curiomundo usa rutas por hash (`#/…`), así que el cambio de dominio
no rompe ningún enlace interno, buscador ni favorito. Solo actualiza las URLs absolutas de
`public/robots.txt`, `public/sitemap.xml` y `public/rss.xml` con el dominio definitivo.

## ❓ Problemas frecuentes

| Síntoma | Causa y solución |
|---|---|
| «404: There isn't a GitHub Pages site here» | Pages no está activado: Settings → Pages → Source: **GitHub Actions**. |
| El workflow falla en «npm ci» | Falta `package-lock.json` en el repo (debe subirse: no está en `.gitignore`). |
| La web carga sin estilos | Revisa en Actions que el build haya terminado en verde antes de abrir la URL. |
| Quiero otra rama | Cambia `branches: [main]` en `.github/workflows/deploy.yml`. |
