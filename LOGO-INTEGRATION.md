# 🎨 Integración del Logo SportClub

## 📍 Ubicaciones donde se usa el Logo/Texto

### 1. **En la Imagen Generada** (Marca de agua)
**Archivo:** `src/lib/imageGenerator.ts` (línea 165)
```typescript
// Marca de agua o logo del club (opcional)
ctx.font = 'bold 32px sans-serif';
dibujarTextoConSombra(ctx, '🚴‍♂️ Sport Club', IMAGE_WIDTH / 2, IMAGE_HEIGHT - 67, template.colorTexto);
```
- **Posición:** Centro inferior (67px desde abajo)
- **Formato actual:** Texto con emoji
- **Tamaño:** 32px bold
- **Color:** Depende de la plantilla (generalmente blanco)

### 2. **En el Header de la Página**
**Archivo:** `src/pages/index.astro` (línea 25)
```astro
<h1>🚴‍♂️ Sport Club Img Gen</h1>
```
- **Posición:** Header principal de la página
- **Formato actual:** Texto H1 con emoji
- **Responsive:** Se adapta al tamaño de pantalla

### 3. **En el Preview Vacío**
**Archivo:** `src/components/ImagePreview.astro` (línea 13)
```astro
<div class="preview-empty-icon">🚴‍♂️</div>
```
- **Posición:** Centro del contenedor vacío
- **Formato actual:** Solo emoji
- **Tamaño:** 4rem (64px)

---

## 🔄 Paso 1: Convertir el Logo

Tu logo está en formato `.xcf` (GIMP). Necesitas convertirlo a un formato web:

### Opción A: PNG con Transparencia (Recomendado para imágenes en canvas)
```bash
# Con GIMP desde línea de comandos (si está instalado)
gimp -i -b '(let* ((image (car (gimp-file-load RUN-NONINTERACTIVE "src/assets/logos/logoZ5.xcf" "src/assets/logos/logoZ5.xcf"))) (drawable (car (gimp-image-merge-visible-layers image CLIP-TO-IMAGE)))) (file-png-save RUN-NONINTERACTIVE image drawable "src/assets/logos/logoZ5.png" "src/assets/logos/logoZ5.png" 0 9 0 0 0 0 0) (gimp-image-delete image))' -b '(gimp-quit 0)'

# O manualmente en GIMP:
# 1. Abrir logoZ5.xcf en GIMP
# 2. Archivo > Exportar como > logoZ5.png
# 3. Guardar en: src/assets/logos/logoZ5.png
```

### Opción B: SVG (Mejor para escalabilidad)
```bash
# Si tienes inkscape instalado:
inkscape src/assets/logos/logoZ5.xcf --export-type=svg --export-filename=src/assets/logos/logoZ5.svg

# O manualmente:
# 1. Abrir en GIMP
# 2. Exportar como PNG temporal
# 3. Usar https://convertio.co/png-svg/ para convertir
```

---

## 🎯 Paso 2: Integración del Logo

### Opción 1: Logo en la Imagen Generada (Marca de agua)

**Ventajas:**
- ✅ Aparece en todas las imágenes descargadas
- ✅ Branding consistente
- ✅ Marca de agua profesional

**Código a modificar en `src/lib/imageGenerator.ts`:**

```typescript
// Después de la línea "const __dirname = dirname(__filename);"
// Cargar el logo una sola vez al inicio del módulo
let logoImage: Image | null = null;

async function loadLogo() {
  if (!logoImage) {
    try {
      const logoPath = join(process.cwd(), 'src/assets/logos/logoZ5.png');
      logoImage = await loadImage(logoPath);
    } catch (error) {
      console.warn('No se pudo cargar el logo, usando texto');
    }
  }
  return logoImage;
}

// Reemplazar la línea 165:
// ANTES:
ctx.font = 'bold 32px sans-serif';
dibujarTextoConSombra(ctx, '🚴‍♂️ Sport Club', IMAGE_WIDTH / 2, IMAGE_HEIGHT - 67, template.colorTexto);

// DESPUÉS:
const logo = await loadLogo();
if (logo) {
  // Dibujar logo (ajusta el tamaño según necesites)
  const logoWidth = 200; // Ajustar según tu logo
  const logoHeight = 60; // Ajustar según tu logo
  const logoX = (IMAGE_WIDTH - logoWidth) / 2;
  const logoY = IMAGE_HEIGHT - 100;
  
  ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
} else {
  // Fallback a texto
  ctx.font = 'bold 32px sans-serif';
  dibujarTextoConSombra(ctx, 'SportClub', IMAGE_WIDTH / 2, IMAGE_HEIGHT - 67, template.colorTexto);
}
```

### Opción 2: Logo en el Header de la Página

**Ventajas:**
- ✅ Branding visual en la interfaz
- ✅ Más profesional
- ✅ Reconocimiento de marca

**Código a modificar en `src/pages/index.astro`:**

```astro
<!-- ANTES: -->
<h1>🚴‍♂️ Sport Club Img Gen</h1>

<!-- DESPUÉS: -->
<div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
  <img 
    src="/logos/logoZ5.png" 
    alt="SportClub Logo" 
    style="height: 60px; width: auto;"
  />
  <h1 style="margin: 0;">SportClub Img Gen</h1>
</div>
```

**Nota:** También necesitarás copiar el logo a `public/logos/logoZ5.png` para que sea accesible públicamente.

### Opción 3: Logo en el Preview Vacío

**Código a modificar en `src/components/ImagePreview.astro`:**

```astro
<!-- ANTES: -->
<div class="preview-empty-icon">🚴‍♂️</div>

<!-- DESPUÉS: -->
<img 
  src="/logos/logoZ5.png" 
  alt="SportClub Logo" 
  style="width: 120px; height: auto; opacity: 0.3;"
/>
```

---

## 📋 Paso 3: Plan de Implementación

### Pasos Recomendados:

1. **Convertir el logo a PNG:**
   ```bash
   # Abre GIMP manualmente o usa comando
   # Exporta como: src/assets/logos/logoZ5.png
   # Asegúrate de que tenga fondo transparente
   ```

2. **Copiar logo a public (para uso en HTML):**
   ```bash
   mkdir -p public/logos
   cp src/assets/logos/logoZ5.png public/logos/
   ```

3. **Integrar en los 3 lugares:**
   - ✅ Header de la página (más fácil)
   - ✅ Preview vacío (más fácil)
   - ✅ Marca de agua en imagen generada (requiere código TypeScript)

---

## 🎨 Recomendaciones de Diseño

### Para la Marca de Agua (en imagen generada):
- **Tamaño:** 150-250px de ancho
- **Opacidad:** 0.7-0.9 (para que no tape el contenido)
- **Posición:** Centro inferior (actual) o esquina inferior derecha
- **Fondo:** Transparente PNG

### Para el Header:
- **Tamaño:** 40-60px de alto
- **Formato:** PNG o SVG
- **Estilo:** A color completo

### Para el Preview:
- **Tamaño:** 100-150px
- **Opacidad:** 0.3-0.5 (marca de agua sutil)
- **Formato:** PNG con transparencia

---

## ❓ Preguntas para Decidir

Antes de implementar, dime:

1. **¿Dónde quieres el logo principalmente?**
   - [ ] En la imagen generada (marca de agua)
   - [ ] En el header de la página
   - [ ] En ambos lugares

2. **¿Has convertido ya el .xcf a PNG?**
   - Si no, ¿tienes GIMP instalado?
   - ¿Necesitas ayuda para convertirlo?

3. **¿Cómo es tu logo?**
   - ¿Tiene texto "SportClub" integrado?
   - ¿Es solo un ícono/símbolo?
   - ¿Tiene fondo transparente?

4. **¿Qué dimensiones tiene aproximadamente?**
   - Esto me ayudará a calcular el tamaño óptimo

---

## 🚀 Siguiente Paso

Una vez que me digas tus preferencias, puedo:
1. Ayudarte a convertir el logo
2. Implementar el código necesario
3. Ajustar tamaños y posiciones

**¿Por dónde quieres empezar?** 🎨
