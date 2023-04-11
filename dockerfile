FROM node:18-bullseye-slim 

WORKDIR /home/node
COPY package*.json ./

COPY . .
RUN npm ci
RUN npm run build

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=/home/node/dist/payload.config.js

WORKDIR /home/node

EXPOSE 3000

CMD ["npm", "run", "serve"]

