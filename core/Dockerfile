FROM node
WORKDIR /unlock/core
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=moderate
COPY . .
RUN npm run build
