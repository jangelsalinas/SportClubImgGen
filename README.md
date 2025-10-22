# 🚴‍♂️ Sport Club Img Gen

Aplicación web construida con Astro que genera imágenes personalizadas (1080x1080px) en el servidor para compartir información sobre salidas en bicicleta. Las imágenes se generan dinámicamente usando plantillas de fondo y datos del usuario.

## 🎯 Características

- ✅ Generación de imágenes 1080x1080px en el servidor con node-canvas
- ✅ 3 plantillas de fondo personalizables (Montaña, Carretera, Ciudad)
- ✅ Formulario interactivo para capturar datos de salidas
- ✅ Preview en tiempo real de la imagen generada
- ✅ Descarga directa de la imagen en formato PNG
- ✅ Copia al portapapeles con un clic
- ✅ Optimizado para Instagram, Facebook y WhatsApp
- ✅ Diseño responsive y moderno

## �️ Stack Tecnológico

- **Astro** v5 - Framework principal (SSR)
- **TypeScript** - Lenguaje de desarrollo
- **node-canvas** - Generación de imágenes en servidor
- **Vanilla JS** - Scripts del cliente (sin frameworks adicionales)

## � Requisitos Previos

### macOS
```bash
brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
```

### Ubuntu/Debian
```bash
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

### Node.js
- Node.js v18 o superior

## 🚀 Instalación

1. **Instalar dependencias del sistema** (ver Requisitos Previos arriba)

2. **Instalar dependencias de npm:**
```bash
npm install
```

3. **Generar plantillas de imágenes:**
```bash
node scripts/generateTemplates.mjs
```

## 🏃‍♂️ Uso

### Desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:4321`

### Build para Producción
```bash
npm run build
```

### Preview del Build
```bash
npm run preview
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
