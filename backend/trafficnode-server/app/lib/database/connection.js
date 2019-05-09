const Neode = require('neode');

const instance = new Neode(process.env.NEO4J_URI, process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD).withDirectory(__dirname + '/models');

module.exports = instance;