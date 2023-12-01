FROM node
WORKDIR /unlock/frontend
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=critical

FROM unlock-wasm

FROM node

COPY --from=0 /unlock/frontend/node_modules /unlock/frontend/node_modules
COPY --from=1 /unlock/wasm /unlock/wasm

WORKDIR /unlock/frontend
COPY . .
RUN npm run build

FROM nginx
COPY --from=2 /unlock/frontend/public /usr/share/nginx/html
COPY --from=2 /unlock/frontend/dist /usr/share/nginx/html