# frontend/Dockerfile
FROM node:20

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]
