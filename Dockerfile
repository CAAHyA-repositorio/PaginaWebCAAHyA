# --- Etapa 1: Construcción de la aplicación ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir el sitio estático (genera la carpeta dist/)
RUN npm run build

# --- Etapa 2: Servidor Nginx para producción ---
FROM nginx:alpine

# Copiar los archivos construidos en la etapa 1 al directorio público de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
