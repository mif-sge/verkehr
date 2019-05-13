const Neode = require('neode');

const instance = new Neode(process.env.NEO4J_URI || 'bolt://localhost', process.env.NEO4J_USERNAME || 'neo4j', process.env.NEO4J_PASSWORD || 'neo4j').withDirectory(__dirname + '/models');

module.exports = instance;