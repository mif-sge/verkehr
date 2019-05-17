FROM node:10.15.3-alpine
# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV CI true

# install and cache app dependencies
COPY package.json .
COPY src ./src/
COPY public ./public/
RUN npm install --silent && npm install react-scripts@1.1.1 -g --silent
RUN npm test

# start app
CMD ["npm", "start"]

