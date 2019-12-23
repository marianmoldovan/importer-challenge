FROM node:alpine
RUN mkdir /app
COPY package.json /
RUN yarn install --production
WORKDIR /app
COPY . .
ENV PORT 5001
EXPOSE 5001
CMD ["node", "index.js"]
