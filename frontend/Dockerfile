FROM node
WORKDIR /unlock/frontend
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=critical
COPY . .
RUN npm run build

FROM nginx
COPY --from=0 /unlock/frontend/public /usr/share/nginx/html
COPY --from=0 /unlock/frontend/dist /usr/share/nginx/html
