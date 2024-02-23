FROM node:20-alpine

WORKDIR /app
COPY ./package*.json .
COPY dist dist
RUN npm install --production
CMD ["npm", "start"]
