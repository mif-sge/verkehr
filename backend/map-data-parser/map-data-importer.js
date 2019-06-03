var r=require("request");

var fs = require('fs');

require.extensions['.cypher'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
var cypherScriptsDir = "./cypher-scripts/";
var cypherQuery1 = require(cypherScriptsDir+"import1.cypher");
var cypherQuery2 = require(cypherScriptsDir+"import-bus-stops.cypher");
var cypherQuery3 = require(cypherScriptsDir+"import-shops.cypher");
var cypherQuery4 = require(cypherScriptsDir+"import-traffic-signals.cypher");
var cypherQuery5 = require(cypherScriptsDir+"import-schools.cypher");
var cypherQuery6 = require(cypherScriptsDir+"import-hospitals.cypher");
var dataJSON = require("../../data/openstreetmap-data-osm.json");

var neo4jUrl = "http://neo4j:test@localhost:7474" + "/db/data/transaction/commit";

function cypher(query,params,cb) {
  r.post({uri:neo4jUrl,
          json:{statements:[{statement:query,parameters:params}]}},
         function(err,res) { cb(err,res.body)})
}
cypher(cypherQuery1,{json:dataJSON},function(err, result) { console.log(err, JSON.stringify(result))});
cypher(cypherQuery2,{json:dataJSON},function(err, result) { console.log(err, JSON.stringify(result))});
cypher(cypherQuery3,{json:dataJSON},function(err, result) { console.log(err, JSON.stringify(result))});
cypher(cypherQuery4,{json:dataJSON},function(err, result) { console.log(err, JSON.stringify(result))});
cypher(cypherQuery5,{json:dataJSON},function(err, result) { console.log(err, JSON.stringify(result))});
cypher(cypherQuery6,{json:dataJSON},function(err, result) { console.log(err, JSON.stringify(result))});
