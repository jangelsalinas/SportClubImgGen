# Usar Node.js 20 con Alpine Linux (más ligero)
FROM node:20-alpine

# Instalar dependencias del sistema necesarias para node-canvas
RUN apk add --no-cache \
    cairo \
    pango \
    jpeg \
    giflib \
    librsvg \
    pixman \
    ttf-dejavu \
    fontconfig

# Crear directorio de la aplicación
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar TODAS las dependencias (necesarias para el build)
RUN npm ci

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN npm run build

# Limpiar dependencias de desarrollo después del build
RUN npm prune --production

# Exponer el puerto
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Comando para iniciar la aplicación
CMD ["node", "./dist/server/entry.mjs"]
