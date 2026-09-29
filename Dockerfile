# ETAPA 1: Construcción (Build)
FROM node:24 AS build

WORKDIR /app

# Copia los archivos de dependencias
COPY /frontend/package*.json ./
RUN npm install

# Copia el código fuente y genera los archivos estáticos
COPY /frontend/ .
RUN npm run build

# ETAPA 2: Servidor (Production)
FROM nginx

# Copia el resultado del build al directorio de Nginx
# Nota: "dist" varía según tu framework (ej. "build" en Create React App, "dist" en Vite/Vue)
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]