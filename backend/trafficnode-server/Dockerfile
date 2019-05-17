FROM node:10.15.3-alpine
# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . .
RUN npm install --silent

# start app
CMD ["npm", "start"]
