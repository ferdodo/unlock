FROM node
WORKDIR /unlock/frontend
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm config set maxsockets 1
RUN npm install
RUN npm audit --audit-level=critical

FROM unlock-puzzle-generator
FROM unlock-svg-to-png
FROM unlock-pngs-to-gif
FROM unlock-core

FROM node

COPY --from=0 /unlock/frontend/node_modules /unlock/frontend/node_modules
COPY --from=1 /unlock/puzzle-generator /unlock/puzzle-generator
COPY --from=2 /unlock/svg-to-png /unlock/svg-to-png
COPY --from=3 /unlock/pngs-to-gif /unlock/pngs-to-gif
COPY --from=4 /unlock/core /unlock/core

WORKDIR /unlock/frontend
COPY . .
RUN npm run build
CMD npm run start
