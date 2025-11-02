# Etapa 1: Construcción
FROM node:20-alpine AS build
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm ci

# Copia el código fuente
COPY . .

# Construye la aplicación
RUN npm run build

# Etapa 2: Servidor de producción con Nginx
FROM nginx:alpine

# Copia los archivos construidos desde la etapa de build
COPY --from=build /app/dist /usr/share/nginx/html

# Copia configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]