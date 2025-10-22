# Usar Node.js 20 con Alpine Linux (más ligero)
FROM node:20-alpine

# Instalar dependencias del sistema necesarias para node-canvas y compilación
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    cairo-dev \
    pango-dev \
    jpeg-dev \
    giflib-dev \
    librsvg-dev \
    pixman-dev \
    cairo \
    pango \
    jpeg \
    giflib \
    librsvg \
    pixman \
    ttf-dejavu \
    fontconfig \
    && ln -sf python3 /usr/bin/python

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
