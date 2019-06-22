var request=require("request");

var fs = require('fs');

require.extensions['.cypher'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const dataJSON = require("../../data/openstreetmap-data-osm.json");
const neo4jUrl = "http://neo4j:test@localhost:7474" + "/db/data/transaction/commit";
let cypherScriptsDir = "./cypher-scripts/";
let cypherQueries = fs.readdirSync('./cypher-scripts/');
let initCypherScriptName= "import-init.cypher";
let buslinesCypherScriptName="import-bus-lines.cypher";
if(!cypherQueries.includes(initCypherScriptName)){
  console.log("InitScript " +initCypherScriptName+" not found" );
  return;
}
cypherQueries = cypherQueries.filter(item => item !== initCypherScriptName).filter(item => item !== buslinesCypherScriptName);



/**
 * POST-Method sending Cypher script with dataJSON to neo4j database.
 *
 * @param  {String} query  cypher script with querry for neo4j
 * @param  {String} params data to import into neo4j
 * @return {Promise}        Resolve: returning body of response; Reject: returning error description
 */
let cypher = function(queryFileName,params) {
  let query= require(cypherScriptsDir+queryFileName);
	const options = {
		url: neo4jUrl,
		method: "POST",
		json: {statements:[{statement:query,parameters:params}]}
	}

	return new Promise((resolve, reject) => {
		request(options, (err, res, body) => {
			if(err) {
				reject(err);
				return;
			}
			if(res.statusCode >= 200 && res.statusCode < 300) {
        console.log("\nquery file: %s,\nquery result:{\n %s\n}", queryFileName, body);
				resolve(body);
				return;
			}
      reject(res.statusCode+"");
      return;
		})
	})
}

/**
 * Send data to neo4j data bank with initial cypher script  to import nodes and ways into data bank.
 * If init script wars succeseful, send other cypherscripts and data to neo4j to create other items, that depends on nodes and ways
 * @param  {[type]} cypherQueryInit initial script for neo4j, schould be processed before other scripts.
 * @param  {[type]} json            data to import into neo4j
 * @return {[type]}                 errors
 */
cypher(initCypherScriptName,{json:dataJSON})
.then(json => {
  let res = new Array(cypherQueries.length);
  for(let file of cypherQueries) {
    res.push(cypher(file,{json:dataJSON}));
  }
  return Promise.all(res);
}).then(json => {
  console.log("start latest cypher script")
  cypher(buslinesCypherScriptName,{json:dataJSON});
})
.catch(err => {
  console.log(err);
})
