#Multi-Stage
#Primera fase
FROM node:24 AS build

WORKDIR /frontend

# 1. RECIBIR LOS ARGUMENTOS ENVIADOS DESDE DOCKER COMPOSE
ARG VITE_APP_NAME
ARG VITE_API_URL
ARG VITE_SERVER_URL

# 2. CONVERTIRLOS EN VARIABLES DE ENTORNO DISPONIBLES EN BUILD TIME
ENV VITE_APP_NAME=$VITE_APP_NAME
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SERVER_URL=$VITE_SERVER_URL

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

#Segunda Fase
FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

