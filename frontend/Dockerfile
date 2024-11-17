FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install && npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
