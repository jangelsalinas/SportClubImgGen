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

# Instalar dependencias de producción
RUN npm ci --only=production

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Comando para iniciar la aplicación
CMD ["node", "./dist/server/entry.mjs"]
