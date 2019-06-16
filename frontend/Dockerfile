FROM node:10.15.3-alpine as develop-stage
# set working directory
RUN mkdir -p /app
WORKDIR /app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV CI true

# install and cache app dependencies
COPY package.json .
COPY src ./src/
COPY public ./public/
RUN npm install --silent && npm install react-scripts@1.1.1 -g --silent
RUN npm test

# build stage
FROM develop-stage as build-stage
RUN npm run build
RUN ls -la; pwd

# production stage
FROM nginx:1.15.7-alpine as production-stage
RUN ls -la
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY ./proxy/nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]]
