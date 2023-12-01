FROM node
WORKDIR /unlock
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=critical
COPY . .
RUN npm run build

FROM nginx
COPY --from=0 /unlock/public /usr/share/nginx/html
COPY --from=0 /unlock/dist /usr/share/nginx/html
