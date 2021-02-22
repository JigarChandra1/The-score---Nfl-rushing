FROM node:15.2.1-alpine3.10
EXPOSE 8000
WORKDIR backend
COPY package*.json ./
RUN npm install

COPY . .
CMD ["node", "backend/api/index.js"]