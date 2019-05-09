#!/bin/sh
docker run -d \
  -v ${PWD}:/usr/src/app \
  -v /usr/src/app/node_modules \
  -e PORT=8080 \
  -p 8080:8080 \
  --name verkehr-backend \
  verkehr-backend
