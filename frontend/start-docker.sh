#!/bin/sh
docker run -d \
  -p 3000:3000 \
  --name verkehr-frontend \
  verkehr-frontend
