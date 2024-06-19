FROM node:20-alpine

WORKDIR /app

COPY package*json tsconfig.json .env ./
COPY src ./src
COPY prisma ./prisma

RUN npm i
RUN npm i typescript tsx
RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "dev"]
