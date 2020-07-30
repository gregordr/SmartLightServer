FROM node:12
ENV PORT=3999

WORKDIR /app

COPY package*.json ./
RUN npm install

ADD /src .
ENTRYPOINT npx ts-node --files ./backend/server.ts
EXPOSE $PORT
EXPOSE 56700/udp