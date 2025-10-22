# 🚀 Despliegue en Railway

Esta guía te ayudará a desplegar SportClubImgGen en Railway.app

## 📋 Prerrequisitos

1. Cuenta en [Railway.app](https://railway.app) (puedes usar tu cuenta de GitHub)
2. Repositorio en GitHub con el código

## 🔧 Pasos para desplegar

### 1. Preparar el repositorio

Si aún no has subido el código a GitHub:

```bash
# Inicializar git (si no lo has hecho)
git init

# Añadir todos los archivos
git add .

# Hacer commit
git commit -m "Preparar para despliegue en Railway"

# Conectar con tu repositorio de GitHub
git remote add origin https://github.com/jangelsalinas/SportClubImgGen.git

# Subir el código
git push -u origin main
```

### 2. Crear proyecto en Railway

1. Ve a [railway.app](https://railway.app)
2. Haz clic en **"Start a New Project"**
3. Selecciona **"Deploy from GitHub repo"**
4. Autoriza Railway para acceder a tu GitHub
5. Selecciona el repositorio **SportClubImgGen**

### 3. Configuración automática

Railway detectará automáticamente:
- ✅ El archivo `railway.json` con la configuración
- ✅ El archivo `nixpacks.toml` con las dependencias del sistema (Cairo, Pango, etc.)
- ✅ Ejecutará `npm install` y `npm run build`
- ✅ Iniciará la app con `npm run start`

### 4. Variables de entorno (opcional)

No necesitas configurar ninguna variable de entorno para que funcione, pero puedes añadir:

- `HOST=0.0.0.0` (Railway lo configura automáticamente)
- `PORT=3000` (Railway asigna el puerto automáticamente)

### 5. Despliegue

1. Railway comenzará a construir automáticamente
2. Verás el progreso en tiempo real
3. Cuando termine, obtendrás una URL pública tipo: `https://tu-app.railway.app`

## 🎯 Después del despliegue

### Obtener tu URL pública

1. En el dashboard de Railway, haz clic en tu proyecto
2. Ve a la pestaña **"Settings"**
3. Sección **"Domains"** → clic en **"Generate Domain"**
4. Se generará una URL tipo: `sportclubimggen-production.up.railway.app`

### Verificar que funciona

Visita tu URL y deberías ver la aplicación funcionando correctamente con:
- ✅ Logo visible en el header
- ✅ Formulario funcional
- ✅ Generación de imágenes operativa
- ✅ Descarga y copiar al portapapeles funcionando

## 💰 Costos

Railway ofrece:
- **$5 USD de crédito gratis** cada mes
- Tu app consumirá aproximadamente:
  - CPU: Mínimo (solo cuando se usa)
  - RAM: ~500MB
  - Estimado: **$3-5/mes** con uso moderado

## 🔄 Actualizaciones automáticas

Cada vez que hagas `git push` a tu repositorio, Railway:
1. Detectará los cambios automáticamente
2. Reconstruirá la aplicación
3. Desplegará la nueva versión

## 🐛 Solución de problemas

### Error al generar imágenes
- Verifica que `nixpacks.toml` incluya todas las dependencias de Cairo
- Revisa los logs en Railway: pestaña **"Deployments"** → clic en el último deployment → **"View Logs"**

### La app no inicia
- Verifica que el script `start` en `package.json` esté correcto
- Asegúrate de que el build se completó exitosamente

### 502 Bad Gateway
- Espera unos minutos, la app puede estar iniciándose
- Revisa los logs para ver errores de inicio

## 📝 Comandos útiles después del despliegue

```bash
# Ver el estado del proyecto
railway status

# Ver los logs en tiempo real
railway logs

# Conectar con el CLI de Railway (opcional)
npm i -g @railway/cli
railway login
railway link
```

## 🎨 Dominio personalizado (opcional)

Si quieres usar tu propio dominio:

1. Ve a **Settings** → **Domains**
2. Haz clic en **"Custom Domain"**
3. Añade tu dominio (ej: `imggen.tudominio.com`)
4. Configura los DNS según las instrucciones

## ✅ Checklist de despliegue

- [ ] Código subido a GitHub
- [ ] Proyecto creado en Railway
- [ ] Build completado exitosamente
- [ ] Dominio generado
- [ ] App accesible desde la URL pública
- [ ] Generación de imágenes funciona correctamente
- [ ] Logo se muestra correctamente

---

¿Necesitas ayuda? Revisa los logs en Railway o contacta con el soporte.
