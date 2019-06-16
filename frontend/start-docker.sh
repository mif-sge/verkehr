#!/bin/sh
docker run -d \
  -p 80:80 \
  --name verkehr-frontend \
  verkehr-frontend
