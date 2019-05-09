#!/bin/sh
docker run -d \
  -v ${PWD}:/usr/src/app \
  -v /usr/src/app/node_modules \
  -p 3000:3000 \
  --name verkehr-frontend \
  verkehr-frontend
