FROM node:12-alpine as base
WORKDIR .

COPY --chown=node:node . ./

FROM base as production
ENV NODE_ENV=production
RUN npm install --production
CMD ["node", "./index.js"]

FROM base as dev
ENV NODE_ENV=development
RUN npm config set unsafe-perm true && npm install -g nodemon
RUN npm install
CMD ["nodemon", "./index.js"]
