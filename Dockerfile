FROM node:19
# Устанавливаем рабочую директорию в контейнере
WORKDIR /usr/src/app
# Копируем рас. json и package-lock.json
COPY package*.json ./
# Устанавливаем зависимости проекта
RUN npm install
# Копируем исходный код в контейнер
COPY . .
# Запускаем приложение на порту 3000
EXPOSE 3000
CMD [ "npm", "run", "dev" ]