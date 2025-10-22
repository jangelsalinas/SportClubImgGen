# Ejemplos de Uso - Sport Club Img Gen

## 🧪 Ejemplos de Datos para Testing

### Ejemplo 1: Salida Básica

```json
{
  "fecha": "2025-10-15",
  "hora": "19:30",
  "lugar": "Ruta del Cares",
  "descripcion": "Salida épica por los Picos de Europa con el grupo",
  "plantilla": "template1"
}
```

### Ejemplo 2: Con Distancia y Dificultad

```json
{
  "fecha": "2025-10-16",
  "hora": "08:00",
  "lugar": "Lagos de Covadonga",
  "descripcion": "Ascenso matutino a los lagos. Preparad las piernas!",
  "plantilla": "template1",
  "distancia": "45 km",
  "dificultad": "difícil"
}
```

### Ejemplo 3: Ruta Urbana

```json
{
  "fecha": "2025-10-20",
  "hora": "18:00",
  "lugar": "Paseo Marítimo",
  "descripcion": "Salida relajada por el paseo. Ideal para principiantes",
  "plantilla": "template3",
  "distancia": "20 km",
  "dificultad": "fácil"
}
```

### Ejemplo 4: Carretera

```json
{
  "fecha": "2025-10-22",
  "hora": "07:00",
  "lugar": "Ruta N-634",
  "descripcion": "Salida larga por carretera secundaria hacia Santander",
  "plantilla": "template2",
  "distancia": "85 km",
  "dificultad": "moderada"
}
```

---

## 🔧 Testing con cURL

### Generar imagen básica

```bash
curl -X POST http://localhost:4321/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{
    "fecha": "2025-10-15",
    "hora": "19:30",
    "lugar": "Ruta del Cares",
    "descripcion": "Salida épica por los Picos de Europa",
    "plantilla": "template1"
  }' \
  --output salida-test.png
```

### Generar imagen completa

```bash
curl -X POST http://localhost:4321/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{
    "fecha": "2025-10-16",
    "hora": "08:00",
    "lugar": "Lagos de Covadonga",
    "descripcion": "Ascenso matutino a los lagos. Preparad las piernas!",
    "plantilla": "template1",
    "distancia": "45 km",
    "dificultad": "difícil"
  }' \
  --output salida-completa.png
```

---

## 🧪 Testing con JavaScript (Fetch API)

### En el navegador o Node.js

```javascript
const data = {
  fecha: "2025-10-15",
  hora: "19:30",
  lugar: "Ruta del Cares",
  descripcion: "Salida épica por los Picos de Europa",
  plantilla: "template1",
  distancia: "45 km",
  dificultad: "moderada"
};

fetch('http://localhost:4321/api/generate-image', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => response.blob())
  .then(blob => {
    // Crear URL para la imagen
    const imageUrl = URL.createObjectURL(blob);
    console.log('Imagen generada:', imageUrl);
    
    // O descargar directamente
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = 'salida-bici.png';
    a.click();
  })
  .catch(error => console.error('Error:', error));
```

---

## 🎨 Plantillas Disponibles

### template1 - Montaña 🏔️
- **ID:** `template1`
- **Nombre:** Montaña
- **Colores:** Azul a verde (gradiente)
- **Uso recomendado:** Rutas de montaña, ascensos, picos

### template2 - Carretera 🛣️
- **ID:** `template2`
- **Nombre:** Carretera
- **Colores:** Gris a azul (gradiente)
- **Uso recomendado:** Rutas largas, carreteras, travesías

### template3 - Ciudad 🏙️
- **ID:** `template3`
- **Nombre:** Ciudad
- **Colores:** Naranja a morado (gradiente radial)
- **Uso recomendado:** Rutas urbanas, paseos, ciudad

---

## ⚠️ Validaciones de la API

### Campos Obligatorios
- `fecha` - Formato: YYYY-MM-DD
- `hora` - Formato: HH:MM (24 horas)
- `lugar` - String (máx. 50 caracteres recomendado)
- `descripcion` - String (máx. 200 caracteres)

### Campos Opcionales
- `plantilla` - Valores: "template1", "template2", "template3" (default: "template1")
- `distancia` - String libre (ej: "45 km", "30 miles")
- `dificultad` - Valores: "fácil", "moderada", "difícil"

### Errores Comunes

**Error 400 - Campos faltantes:**
```json
{
  "error": "Faltan campos obligatorios"
}
```

**Error 400 - Descripción muy larga:**
```json
{
  "error": "La descripción no puede tener más de 200 caracteres"
}
```

**Error 500 - Error al generar:**
```json
{
  "error": "Error al generar la imagen"
}
```

---

## 📱 Casos de Uso Reales

### 1. Anuncio de Salida Semanal
```json
{
  "fecha": "2025-10-19",
  "hora": "09:00",
  "lugar": "Parque Natural Somiedo",
  "descripcion": "Ruta circular por el parque. Traed avituallamiento!",
  "plantilla": "template1",
  "distancia": "60 km",
  "dificultad": "moderada"
}
```

### 2. Resumen de Ruta Realizada
```json
{
  "fecha": "2025-10-12",
  "hora": "07:30",
  "lugar": "Desfiladero de los Beyos",
  "descripcion": "Completamos la ruta con éxito! Gran día de pedal 🚴",
  "plantilla": "template2",
  "distancia": "72 km",
  "dificultad": "difícil"
}
```

### 3. Salida Urbana Social
```json
{
  "fecha": "2025-10-25",
  "hora": "18:30",
  "lugar": "Parque de la Magdalena",
  "descripcion": "Salida suave por Santander. Acabamos con tapeo! 🍻",
  "plantilla": "template3",
  "distancia": "15 km",
  "dificultad": "fácil"
}
```

---

## 💡 Tips de Uso

### Para Mejores Resultados:

1. **Descripción concisa:** Mantén la descripción breve y al punto
2. **Lugar específico:** Usa nombres reconocibles de lugares
3. **Plantilla apropiada:** Elige la plantilla que mejor represente tu ruta
4. **Distancia clara:** Usa unidades consistentes (km recomendado)
5. **Dificultad honesta:** Ayuda a que otros sepan qué esperar

### Textos que Funcionan Bien:

✅ "Ascenso a los Lagos. Vistas espectaculares garantizadas!"  
✅ "Ruta costera con parada para baño"  
✅ "Travesía de montaña. Solo para valientes 💪"  
✅ "Salida nocturna bajo las estrellas"  

### Textos a Evitar:

❌ Descripciones excesivamente largas que se cortarán  
❌ Emojis en exceso (usa 1-2 máximo)  
❌ Información irrelevante  

---

## 🔍 Debugging

### Ver logs del servidor
El servidor muestra logs en la consola:
- Solicitudes recibidas
- Errores al cargar plantillas
- Errores de generación

### Verificar que las plantillas existen
```bash
ls -la src/assets/templates/
```

Deberías ver:
- template1.jpg
- template2.jpg
- template3.jpg

### Regenerar plantillas si faltan
```bash
npm run generate-templates
```

---

**Última actualización:** 15 de octubre de 2025
