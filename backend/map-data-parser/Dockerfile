FROM node:10.15.3-alpine
RUN mkdir -p /verkehr/backend/map-data-parser/
RUN mkdir -p /verkehr/data/
RUN npm install request
WORKDIR /verkehr/backend/map-data-parser
COPY cypher-scripts /verkehr/backend/map-data-parser/cypher-scripts
COPY map-data-importer.js /verkehr/backend/map-data-parser/map-data-importer.js
COPY data/openstreetmap-data-osm.json /verkehr/data/openstreetmap-data-osm.json
# start app
CMD ["node", "map-data-importer.js"]
