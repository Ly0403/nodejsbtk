FROM node

RUN mkdir -p /app && chown -R node:node /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

CMD [ "npm", "run", "start" ]
