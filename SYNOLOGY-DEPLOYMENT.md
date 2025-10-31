# Despliegue en Synology con Docker

Este proyecto puede desplegarse en un servidor Synology usando Docker con actualización automática desde GitHub.

## 📋 Opciones de despliegue

### Opción 1: GitHub Actions + Docker Hub (Recomendado)
- ✅ Más profesional y confiable
- ✅ Construye la imagen automáticamente
- ✅ Watchtower actualiza automáticamente en Synology
- ⚠️ Requiere cuenta de Docker Hub (gratis)

### Opción 2: Portainer + Webhooks
- ✅ Interfaz gráfica fácil de usar
- ✅ Gestión visual de contenedores
- ⚠️ Requiere exponer puerto del Synology

---

## 🚀 Opción 1: GitHub Actions + Docker Hub (RECOMENDADO)

### Paso 1: Crear cuenta en Docker Hub

1. Ve a https://hub.docker.com
2. Crea una cuenta gratuita (si no la tienes)
3. Crea un repositorio público: `jangelsalinas/sportclub-img-gen`

### Paso 2: Configurar secrets en GitHub

1. Ve a tu repositorio en GitHub
2. Settings → Secrets and variables → Actions
3. Crea estos secrets:
   - `DOCKERHUB_USERNAME`: tu usuario de Docker Hub
   - `DOCKERHUB_TOKEN`: token de acceso (crear en Docker Hub → Account Settings → Security → New Access Token)

### Paso 3: Los archivos ya están listos

El proyecto incluye:
- ✅ `Dockerfile` - Para construir la imagen
- ✅ `.github/workflows/docker-publish.yml` - Para CI/CD automático
- ✅ `docker-compose.yml` - Para desplegar en Synology

### Paso 4: Desplegar en Synology

1. **Conectar por SSH al Synology**:
   ```bash
   ssh admin@tu-synology.local
   ```

2. **Crear directorio del proyecto**:
   ```bash
   mkdir -p /volume1/docker/sportclub-img-gen
   cd /volume1/docker/sportclub-img-gen
   ```

3. **Crear docker-compose.yml**:
   ```bash
   cat > docker-compose.yml << 'EOF'
   version: '3.8'
   
   services:
     sportclub-img-gen:
       image: mullins85zgz/sportclub-img-gen:latest
       container_name: sportclub-img-gen
       restart: unless-stopped
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=production
       labels:
         - "com.centurylinklabs.watchtower.enable=true"
   
     watchtower:
       image: containrrr/watchtower
       container_name: watchtower
       restart: unless-stopped
       volumes:
         - /var/run/docker.sock:/var/run/docker.sock
       environment:
         - WATCHTOWER_POLL_INTERVAL=300  # Revisa cada 5 minutos
         - WATCHTOWER_CLEANUP=true
         - WATCHTOWER_LABEL_ENABLE=true
       command: --interval 300
   EOF
   ```

4. **Iniciar los contenedores**:
   ```bash
   docker-compose up -d
   ```

5. **Verificar que funciona**:
   - Abre tu navegador: `http://tu-synology.local:3000`

### ¿Cómo funciona la actualización automática?

1. Haces `git push` en tu repositorio
2. GitHub Actions construye automáticamente una nueva imagen Docker
3. La sube a Docker Hub con tag `latest`
4. Watchtower (en Synology) detecta la nueva imagen cada 5 minutos
5. Descarga la nueva imagen y reinicia el contenedor automáticamente

---

## 🎨 Opción 2: Portainer + Webhooks

### Paso 1: Instalar Portainer en Synology

1. Abre **Container Manager** en Synology
2. Descarga la imagen `portainer/portainer-ce`
3. Inicia con estas configuraciones:
   - Puerto: `9000:9000`
   - Volume: `/var/run/docker.sock:/var/run/docker.sock`

### Paso 2: Configurar Stack en Portainer

1. Accede a Portainer: `http://tu-synology.local:9000`
2. Ve a **Stacks** → **Add Stack**
3. Usa el `docker-compose.yml` incluido en el proyecto
4. Habilita **Webhook** para el stack

### Paso 3: Configurar GitHub Webhook

1. Copia la URL del webhook de Portainer
2. En GitHub: Settings → Webhooks → Add webhook
3. Pega la URL del webhook
4. Content type: `application/json`
5. Trigger: `Just the push event`

---

## 📊 Comparación de opciones

| Característica | GitHub Actions + Watchtower | Portainer + Webhooks |
|---------------|------------------------------|----------------------|
| Configuración inicial | Media | Fácil |
| Seguridad | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Automatización | Total | Total |
| Interfaz gráfica | No | Sí |
| Dependencias externas | Docker Hub | Exponer puerto |
| Build automático | Sí | No (manual o CI/CD) |

---

## 🔧 Troubleshooting

### La app no arranca en Synology

1. Verifica los logs:
   ```bash
   docker logs sportclub-img-gen
   ```

2. Verifica que Cairo/Pango estén disponibles:
   ```bash
   docker exec sportclub-img-gen fc-list
   ```

### Watchtower no actualiza

1. Verifica logs de Watchtower:
   ```bash
   docker logs watchtower
   ```

2. Fuerza una actualización:
   ```bash
   docker exec watchtower /watchtower --run-once
   ```

### Puerto 3000 ya en uso

Cambia el puerto en docker-compose.yml:
```yaml
ports:
  - "8080:3000"  # Usa el puerto 8080 externamente
```

---

## 🌐 Acceso desde Internet (opcional)

Si quieres acceder desde fuera de tu red local:

1. **Opción A: Reverse Proxy en Synology**
   - Abre **Control Panel** → **Login Portal** → **Advanced** → **Reverse Proxy**
   - Crea regla: puerto 443 → localhost:3000
   - Configura certificado SSL

2. **Opción B: Cloudflare Tunnel**
   - Gratis y más seguro
   - No requiere abrir puertos
   - Consulta: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/

---

## 📝 Notas importantes

- **Persistencia**: Los datos se pierden al reiniciar el contenedor (es stateless)
- **Recursos**: La app usa ~200MB RAM + CPU al generar imágenes
- **Backups**: El código está en GitHub, no hay datos que respaldar
- **Actualizaciones**: Automáticas con Watchtower o manuales con `docker-compose pull && docker-compose up -d`

---

¿Necesitas ayuda con algún paso específico?
