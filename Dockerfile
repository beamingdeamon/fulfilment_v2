FROM node:14.17.3
# устанавливаем простой HTTP-сервер для статики
RUN npm install -g http-server

# делаем каталог 'app' текущим рабочим каталогом
WORKDIR /app

# копируем оба 'package.json' и 'package-lock.json' (если есть)
COPY package*.json ./

# устанавливаем зависимости проекта
RUN npm install

# копируем файлы и каталоги проекта в текущий рабочий каталог (т.е. в каталог 'app')
COPY . .

# собираем приложение для production с минификацией
RUN npm run build

#FROM nginx as production-stage

#RUN mkdir /app
#COPY --from=build-stage /app/dicst /app
#COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
CMD ["http-server", "dist"]
