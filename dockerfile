FROM node:20.18.0-alpine3.19

WORKDIR /usr/src/app

COPY package*.json .
COPY prisma ./prisma/

RUN npm ci && npm cache clean --force

COPY . .

RUN npx prisma generate

EXPOSE 4000
CMD ["npm", "run", "start:docker"]
