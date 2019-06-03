var r=require("request");

var fs = require('fs');

require.extensions['.cypher'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

var cypherQuery1 = require("./import1.cypher");
var dataJSON = require("../../data/openstreetmap-data-osm.json");

var neo4jUrl = "http://neo4j:test@localhost:7474" + "/db/data/transaction/commit";

function cypher(query,params,cb) {
  r.post({uri:neo4jUrl,
          json:{statements:[{statement:query,parameters:params}]}},
         function(err,res) { cb(err,res.body)})
}
cypher(cypherQuery1,{json:dataJSON},function(err, result) { console.log(err, JSON.stringify(result))});
