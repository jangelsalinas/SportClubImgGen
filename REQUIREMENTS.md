# SportClubImgGen - Requisitos del Proyecto

## 📋 Descripción General

Aplicación web construida con Astro que genera imágenes personalizadas (1080x1080px) en el servidor para compartir información sobre salidas en bicicleta. Las imágenes se generan dinámicamente usando plantillas de fondo y datos del usuario.

## 🎯 Objetivos

- Generar imágenes cuadradas (1080x1080px) optimizadas para redes sociales
- Permitir la personalización con datos de salidas de bici
- Facilitar la descarga y copia al portapapeles
- Ejecución 100% en servidor (SSR con Astro)

## 🛠️ Stack Tecnológico

### Framework y Lenguajes
- **Astro** v4.x - Framework principal (modo SSR)
- **TypeScript** - Lenguaje de desarrollo
- **Node.js** v18+ - Entorno de ejecución

### Generación de Imágenes
- **node-canvas** - Librería para renderizado Canvas en servidor
- Dependencias de node-canvas (Cairo, Pango, etc.)

### Frontend
- **Vanilla JavaScript/TypeScript** - Scripts del cliente
- **CSS moderno** - Estilos (CSS Variables, Grid, Flexbox)
- **Clipboard API** - Para copiar imágenes al portapapeles

### Deployment (Recomendado)
- **Node.js server** - Para SSR y node-canvas
- Alternativas: DigitalOcean, Render, VPS, Sistema local con Docker

## 📦 Estructura del Proyecto

```
SportClubImgGen/
├── src/
│   ├── pages/
│   │   ├── index.astro          # Página principal (formulario)
│   │   └── api/
│   │       └── generate-image.ts # API endpoint para generar imagen
│   ├── components/
│   │   ├── ImageForm.astro      # Formulario de datos
│   │   └── ImagePreview.astro   # Preview y botones de acción
│   ├── lib/
│   │   ├── imageGenerator.ts    # Lógica de generación con canvas
│   │   └── templates.ts         # Definición de plantillas
│   ├── assets/
│   │   └── templates/           # Imágenes de fondo de plantillas
│   └── styles/
│       └── global.css           # Estilos globales
├── public/
│   └── fonts/                   # Fuentes para canvas
├── astro.config.mjs             # Configuración SSR
├── tsconfig.json
├── package.json
└── README.md
```

## 🎨 Funcionalidades Requeridas

### 1. Formulario de Entrada
- **Campos obligatorios:**
  - Fecha de la salida (input date)
  - Hora de salida (un selector entre varias horas, 08:00,09:00,10:00,11:00,12:00,13:00,14:00,15:00,16:00,17:00,18:00,19:00)
  - Ruta (input select) - El origen de los datos se definira en un fichero aparte, donde se configuren las rutas disponibles (con lugar y descripcion asociados)
  - Lugar: (texto asociado a la ruta seleccionada)
  - Descripción breve (textarea, max 200 caracteres) - asociado a la seleccion de la ruta
  
- **Campos opcionales:**
  - Selección de plantilla de fondo (radio buttons o select), con previsualización del fondo
  - Distancia recorrida (opcional) - sera editable, y se puede cargar un dato por defecto asociado a la ruta
  - Nivel de dificultad (opcional) - sera un selector entre varias opciones predefinidas (fácil, medio, difícil)

### 2. Generación de Imagen

#### En el Servidor (API Endpoint)
```typescript
// POST /api/generate-image
// Body: { fecha, hora, lugar, descripcion, plantilla }
// Response: Imagen PNG en base64 o Buffer
```

#### Requisitos de la Imagen:
- Dimensiones: las que tenga la plantilla seleccionada (1080x1080px recomendado)
- Formato: PNG con transparencia si es necesario
- Calidad óptima para compartir en redes sociales
- Texto legible con buen contraste
- Layout responsive a diferentes longitudes de texto

#### Elementos en la Imagen:
1. **Fondo:** Imagen de plantilla seleccionada
2. **Overlay/Capa de texto:** Con opacidad para legibilidad
3. **Datos visualizados:**
   - Fecha (formato: "Domingo, 15 de Octubre")
   - Hora (formato: "19:30")
   - Lugar/Ruta (destacado)
   - Descripción (texto secundario)
   - Logo/Marca del club (opcional)

### 3. Preview y Acciones

#### Preview
- Mostrar la imagen generada en la página
- Actualización dinámica al enviar el formulario

#### Botones de Acción
1. **Descargar Imagen**
   - Descarga directa del archivo PNG
   - Nombre de archivo sugerido: `salida-bici-YYYY-MM-DD.png`

2. **Copiar al Portapapeles**
   - Usar Clipboard API
   - Feedback visual de éxito/error
   - Fallback para navegadores sin soporte

3. **Compartir (opcional)**
   - Web Share API si está disponible
   - Links directos a WhatsApp/Facebook

### 4. Gestión de Plantillas

- Mínimo 3 plantillas de fondo prediseñadas
- Sistema extensible para agregar más plantillas
- Cada plantilla debe tener:
  - Imagen de fondo (1080x1080px)
  - Configuración de colores de texto
  - Posiciones predefinidas para elementos
  - Recomendado: usar como colores de fondo negro o gris oscuro, y siendo los logos del club en azul electrico, y rosa fucsia.

## 🔧 Implementación Técnica

### node-canvas: Configuración y Uso

```typescript
// Importación
import { createCanvas, loadImage, registerFont } from 'canvas';

// Registro de fuentes personalizadas
registerFont('public/fonts/Roboto-Bold.ttf', { family: 'Roboto', weight: 'bold' });

// Creación del canvas
const canvas = createCanvas(1080, 1080);
const ctx = canvas.getContext('2d');

// Carga de imagen de fondo
const background = await loadImage('src/assets/templates/template1.jpg');
ctx.drawImage(background, 0, 0, 1080, 1080);

// Dibujo de texto con estilos
ctx.font = 'bold 24px Roboto';
ctx.fillStyle = '#FFFFFF';
ctx.textAlign = 'center';
ctx.fillText('Texto', x, y);

// Exportar como Buffer
const buffer = canvas.toBuffer('image/png');
```

### API Endpoint: Generación

```typescript
// src/pages/api/generate-image.ts
import type { APIRoute } from 'astro';
import { generateBikeImage } from '../../lib/imageGenerator';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const imageBuffer = await generateBikeImage(data);
  
  return new Response(imageBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': 'inline; filename="salida-bici.png"'
    }
  });
};
```

### Cliente: Interacción

```javascript
// Enviar datos y recibir imagen
const response = await fetch('/api/generate-image', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});

const blob = await response.blob();
const imageUrl = URL.createObjectURL(blob);

// Mostrar preview
imageElement.src = imageUrl;

// Copiar al portapapeles
const clipboardItem = new ClipboardItem({ 'image/png': blob });
await navigator.clipboard.write([clipboardItem]);
```

## 📐 Reglas de Diseño

### Tipografía
- **Fuente principal:** Sans-serif legible (Roboto, Open Sans, Inter)
- **Tamaños:**
  - Título/Lugar: 28-32px bold
  - Fecha/Hora: 20-24px regular
  - Descripción: 16-18px regular

### Colores
- Alto contraste texto/fondo (WCAG AA mínimo)
- Sombras de texto (text-shadow) para legibilidad
- Overlay semitransparente si el fondo es complejo

### Layout
- Padding interno: mínimo 20px desde los bordes
- Alineación centrada o distribución equilibrada
- Jerarquía visual clara
- Evitar texto cortado o superpuesto

## 🚀 Pasos de Implementación

### Fase 1: Setup Inicial
1. Inicializar proyecto Astro con TypeScript
2. Configurar SSR en `astro.config.mjs`
3. Instalar node-canvas y dependencias del sistema
4. Configurar estructura de carpetas

### Fase 2: Backend (Generación de Imágenes)
1. Crear módulo `imageGenerator.ts`
2. Implementar función de carga de plantillas
3. Implementar función de renderizado de texto
4. Crear API endpoint `/api/generate-image`
5. Probar generación con datos de prueba

### Fase 3: Frontend (Formulario e Interacción)
1. Crear componente `ImageForm.astro`
2. Implementar validación de formulario
3. Crear componente `ImagePreview.astro`
4. Conectar formulario con API
5. Implementar botón de descarga

### Fase 4: Funcionalidades Avanzadas
1. Implementar copia al portapapeles
2. Agregar feedback visual (toast/notification)
3. Implementar selector de plantillas
4. Añadir campos opcionales

### Fase 5: Pulido y Testing
1. Optimizar rendimiento de generación
2. Añadir manejo de errores robusto
3. Mejorar UX/UI
4. Testing en diferentes navegadores
5. Documentación de uso

## ⚠️ Consideraciones Importantes

### node-canvas: Dependencias del Sistema

**macOS:**
```bash
brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
```

**Ubuntu/Debian:**
```bash
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

### Limitaciones y Soluciones

1. **Texto largo:** Implementar word-wrap o truncado con "..."
2. **Caracteres especiales:** Usar fuentes con soporte UTF-8
3. **Performance:** Cachear plantillas cargadas
4. **Memoria:** Liberar recursos después de generar imagen

### Seguridad

- Validar y sanitizar todos los inputs del usuario
- Limitar longitud de texto (prevenir DoS)
- Validar formato de fecha/hora
- Rate limiting en el API endpoint (opcional)

## 🎯 Criterios de Éxito

- [ ] Imagen generada correctamente en 1080x1080px
- [ ] Todos los datos se visualizan correctamente
- [ ] Texto legible con buen contraste
- [ ] Descarga funciona en Chrome, Firefox, Safari
- [ ] Copia al portapapeles funciona (donde esté soportado)
- [ ] Al menos 3 plantillas disponibles
- [ ] Formulario valida datos antes de generar
- [ ] Manejo de errores con mensajes claros
- [ ] Tiempo de generación < 2 segundos

## 📚 Recursos y Referencias

### Documentación
- [Astro SSR](https://docs.astro.build/en/guides/server-side-rendering/)
- [node-canvas](https://github.com/Automattic/node-canvas)
- [Canvas API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)

### Inspiración de Diseño
- Stories de Instagram
- Cards de Strava
- Banners de eventos deportivos

## 🤖 Instrucciones para Copilot

Cuando se solicite generar el código:

1. **Comenzar con la configuración:**
   - Inicializar proyecto Astro con preset SSR
   - Crear `astro.config.mjs` con output: 'server'
   - Configurar TypeScript estricto

2. **Instalar dependencias:**
   - Generar `package.json` con todas las dependencias necesarias
   - Incluir scripts de desarrollo y build

3. **Implementar en orden:**
   - Primero: Lógica de generación de imágenes (`imageGenerator.ts`)
   - Segundo: API endpoint (`/api/generate-image.ts`)
   - Tercero: Componentes de UI (formulario y preview)
   - Cuarto: Página principal integrando todo

4. **Código limpio y mantenible:**
   - Usar TypeScript con tipos explícitos
   - Comentar funciones complejas
   - Separar responsabilidades en módulos
   - Manejar errores con try-catch y mensajes claros

5. **Testing básico:**
   - Incluir datos de ejemplo para probar
   - Agregar logs útiles en desarrollo

6. **Documentación:**
   - Actualizar README.md con instrucciones de setup
   - Documentar configuración de node-canvas
   - Incluir ejemplos de uso

---

**Versión:** 1.0  
**Fecha:** 15 de octubre de 2025  
**Estado:** Planificación - Pendiente de implementación
