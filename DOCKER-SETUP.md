# 🐳 Configuración de Docker Hub para CI/CD

## Paso 1: Crear cuenta en Docker Hub

1. Ve a https://hub.docker.com
2. Haz clic en **Sign Up**
3. Completa el registro con tu email

## Paso 2: Crear Access Token

1. Inicia sesión en Docker Hub
2. Ve a **Account Settings** (esquina superior derecha)
3. Ve a la pestaña **Security**
4. Haz clic en **New Access Token**
5. Nombre: `GitHub Actions - SportClub`
6. Permisos: **Read, Write, Delete**
7. Copia el token (¡solo se muestra una vez!)

## Paso 3: Crear repositorio en Docker Hub

1. En Docker Hub, haz clic en **Repositories**
2. Haz clic en **Create Repository**
3. Nombre: `sportclub-img-gen`
4. Visibilidad: **Public** (para evitar límites de pulls)
5. Descripción: `Generador de imágenes para salidas en bici`

## Paso 4: Configurar Secrets en GitHub

1. Ve a tu repositorio: https://github.com/jangelsalinas/SportClubImgGen
2. Haz clic en **Settings** → **Secrets and variables** → **Actions**
3. Haz clic en **New repository secret**

**Crear estos dos secrets:**

### Secret 1: DOCKERHUB_USERNAME
- Name: `DOCKERHUB_USERNAME`
- Secret: `jangelsalinas` (tu usuario de Docker Hub)

### Secret 2: DOCKERHUB_TOKEN
- Name: `DOCKERHUB_TOKEN`
- Secret: `dckr_pat_xxxxxxxxxxxxx` (el token que copiaste antes)

## Paso 5: Verificar que funciona

1. Haz cualquier cambio en el código
2. `git add .`
3. `git commit -m "test: verificar Docker CI/CD"`
4. `git push origin main`

5. Ve a GitHub → **Actions** → verás el workflow ejecutándose

6. Cuando termine (3-5 minutos), ve a Docker Hub y verás la imagen publicada

## 🎯 Resultado

Ahora cada vez que hagas `git push`:
- ✅ GitHub Actions construye la imagen Docker automáticamente
- ✅ La sube a Docker Hub como `jangelsalinas/sportclub-img-gen:latest`
- ✅ Watchtower en tu Synology la detecta y actualiza en 5 minutos

---

## 🔍 Troubleshooting

### Error: "unauthorized: authentication required"
- Verifica que los secrets en GitHub sean correctos
- Asegúrate de que el token no haya expirado

### Error: "denied: requested access to the resource is denied"
- Verifica que el nombre del repositorio en Docker Hub coincida: `jangelsalinas/sportclub-img-gen`
- Asegúrate de que el repositorio sea público o tengas plan de pago

### El workflow no se ejecuta
- Verifica que el archivo esté en: `.github/workflows/docker-publish.yml`
- Asegúrate de que el push sea a la rama `main`

---

✅ Una vez configurado, ¡todo es automático!
