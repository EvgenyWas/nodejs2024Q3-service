FROM node:20.18.0-alpine3.19

ENV PORT=4000

WORKDIR /usr/src/app

COPY package*.json .
COPY prisma ./prisma/

RUN npm ci && npm cache clean --force

COPY . .

RUN npx prisma generate

EXPOSE $PORT
CMD ["npm", "run", "start:docker"]
