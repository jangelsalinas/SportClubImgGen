# 🚴 Rutas Predefinidas

## Descripción

Esta funcionalidad permite seleccionar rutas predefinidas en el formulario, que precargan automáticamente todos los datos de la salida (lugar, descripción, distancia, dificultad y plantilla).

## ¿Cómo usar?

1. En el formulario, verás un selector "🚴 Ruta Predefinida (opcional)" al principio
2. Selecciona una ruta de la lista desplegable
3. Los campos del formulario se rellenarán automáticamente con los datos de la ruta
4. Puedes modificar cualquier campo después de seleccionar la ruta
5. Ajusta la fecha y hora según tu salida
6. Genera la imagen

## Rutas incluidas por defecto

### 🏔️ Rutas de Montaña
- **Ruta del Cares** - Picos de Europa (12 km, moderada)
- **Lagos de Covadonga** - Asturias (25 km, difícil)
- **Naranjo de Bulnes** - Picos de Europa (18 km, difícil)
- **Puerto de Pajares** - León-Asturias (35 km, difícil)

### 🌊 Rutas Costeras
- **Senda Costera** - Costa Asturiana (30 km, fácil)

### 🏙️ Rutas Urbanas
- **Ruta Urbana** - Centro Ciudad (15 km, fácil)

## Añadir nuevas rutas

Para añadir tus propias rutas, edita el archivo:

```
src/lib/rutasPredefinidas.ts
```

### Estructura de una ruta

```typescript
{
  id: 'identificador-unico',           // ID único para la ruta
  nombre: 'Nombre de la Ruta',         // Nombre que aparece en el selector
  lugar: 'Lugar/Localidad',            // Ubicación de la ruta
  descripcion: 'Descripción...',       // Descripción de la ruta (máx 200 caracteres)
  distancia: '20 km',                  // Distancia (opcional)
  dificultad: 'moderada',              // 'fácil', 'moderada' o 'difícil' (opcional)
  plantilla: 'template1'               // 'template1', 'template2' o 'template3' (opcional)
}
```

### Ejemplo de nueva ruta

```typescript
{
  id: 'alto-angliru',
  nombre: 'Alto del Angliru',
  lugar: 'Asturias',
  descripcion: 'Mítico puerto asturiano con rampas de más del 20%',
  distancia: '12.5 km',
  dificultad: 'difícil',
  plantilla: 'template1'
}
```

## Características

✅ **Selector opcional** - No es obligatorio seleccionar una ruta
✅ **Precarga automática** - Todos los campos se rellenan automáticamente
✅ **Editable** - Puedes modificar los datos después de seleccionar
✅ **Feedback visual** - El selector se ilumina en verde al seleccionar una ruta
✅ **Fácil de extender** - Añade más rutas editando un solo archivo

## Notas técnicas

- Las rutas se definen en `src/lib/rutasPredefinidas.ts`
- Los datos se duplican en el cliente (JavaScript) para evitar dependencias
- Si añades rutas, recuerda actualizar ambas ubicaciones:
  1. El array `rutasPredefinidas` (TypeScript)
  2. El objeto `rutasData` en el script del componente
- La plantilla seleccionada cambia el fondo de la imagen generada

## Mejoras futuras

- [ ] Cargar rutas desde una API o base de datos
- [ ] Permitir a los usuarios crear y guardar sus propias rutas
- [ ] Importar rutas desde archivos GPX
- [ ] Filtrar rutas por dificultad o distancia
- [ ] Añadir imágenes de preview de cada ruta
