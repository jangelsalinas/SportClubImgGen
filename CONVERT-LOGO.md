# 🎨 Instrucciones para Convertir el Logo

## Conversión Manual con GIMP (Más Sencillo)

1. **Abre GIMP**
   - Ve a Aplicaciones y abre GIMP

2. **Abre el archivo**
   - Archivo > Abrir
   - Navega a: `src/assets/logos/logoZ5.xcf`

3. **Exporta como PNG**
   - Archivo > Exportar como...
   - Nombre: `logoZ5.png`
   - Ubicación: **Misma carpeta** (`src/assets/logos/`)
   - Formato: PNG
   - Haz clic en "Exportar"

4. **Configuración PNG (opcional)**
   - Nivel de compresión: 9 (máxima)
   - Guardar información de fondo: NO
   - Guardar resolución: SÍ
   - Clic en "Exportar"

5. **Verifica el resultado**
   - Deberías tener: `src/assets/logos/logoZ5.png`
   - Con fondo transparente (si tu logo lo tiene)

---

## ⚡ Rápido: Desde la línea de comandos

Si prefieres hacerlo desde terminal (alternativa):

```bash
# Método 1: Con GIMP (si funciona)
/Applications/GIMP.app/Contents/MacOS/gimp -i -b '(let* ((image (car (gimp-file-load RUN-NONINTERACTIVE "src/assets/logos/logoZ5.xcf" "src/assets/logos/logoZ5.xcf"))) (drawable (car (gimp-image-flatten image)))) (file-png-save RUN-NONINTERACTIVE image drawable "src/assets/logos/logoZ5.png" "src/assets/logos/logoZ5.png" 0 9 0 0 0 0 0) (gimp-image-delete image))' -b '(gimp-quit 0)'

# Método 2: Con ImageMagick (si lo tienes instalado)
brew install imagemagick
convert src/assets/logos/logoZ5.xcf src/assets/logos/logoZ5.png
```

---

## ✅ Una vez convertido

Avísame cuando tengas el archivo `logoZ5.png` y procederé a:
1. Integrarlo en el header de la web
2. Agregarlo como marca de agua en las imágenes generadas

**¿Quieres que intente la conversión automática o prefieres hacerlo manualmente en GIMP?**
