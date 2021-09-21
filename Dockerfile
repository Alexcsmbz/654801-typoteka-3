FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

# ENV NODE_ENV development

EXPOSE 80

CMD npm run start-app
