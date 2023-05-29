FROM node:16.20-buster

ARG APP=""

ENV NODE_ENV production
ENV NODE_OPTIONS --enable-source-maps

USER node
WORKDIR /home/node

COPY --chown=node:node ./dist/apps/api/${APP} /home/node
RUN chmod -R u=rwx /home/node
RUN NODE_ENV=production npm i --ignore-scripts --no-audit --no-optional --force

CMD ["node", "main.js"]