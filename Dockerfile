FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV SPOTIFY_TOKEN=${{ secrets.SPOTIFY_TOKEN }}
ENV DB_URI=${{ secrets.DB_URI }}
ENV SPOTIFY_ID=${{ secrets.SPOTIFY_ID }}
ENV SPOTIFY_SECRET=${{ secrets.SPOTIFY_SECRET }}
ENV JWT_SECRET=${{ secrets.JWT_SECRET }}

EXPOSE 3000

CMD [ "npm", "start" ]