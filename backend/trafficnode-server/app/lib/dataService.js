const con = require('./database/connection');

/**
 * A test class.
 */
class DataService {

    /**
     * Tries to connect to a running instance of neo4j as defined in the environment file and return all records.
     * If the database can't be reached, the request will be termined after the globally set timeout.
     * @returns {Promise<StatementResult>} A promise to all records.
     */
    async getAll(modelName) {

        try{
          let res = await con.model(modelName).all();
          return this.pickObjects(res);
        }catch(err){
          return err;
        }
    }

      /**
     * Tries to connect to a running instance of neo4j as defined in the environment file and return all records.
     * If the database can't be reached, the request will be termined after the globally set timeout.
     * @returns {Promise<StatementResult>} A promise to all records.
     */
    async getAllWithRelations(modelName) {
        try{
          let res = await con.model(modelName).all();
          let objWithRel = this.pickObjectsWithRelations(res);
          return objWithRel;
        }catch(err){
          console.log(err);
          return err;
        }
    }

    async pickObjectsWithRelations(objCollection){
      let objects =  [];
      objCollection.forEach(async (e) => {
        let ename = e.model().name();
        let json = {
        }
        json[ename] = e.properties();
        let relationships = e.model().eager();
        for(const relation of relationships) {
          let relationModel = e.get(relation.name());
          if(relation.type() == "relationships" ) {
            json[relation.name()] = await this.pickRelationships(relationModel);
          } else {
            if(relation.direction() == 'DIRECTION_IN'){
              json[relation.name()] = await this.pickRelationship(relationModel, "start");
            } else{
              json[relation.name()] = await this.pickRelationship(relationModel, "end");
            }
          }
        }

        objects.push(json);
      });
        return objects;
    }
    async pickObjects(objCollection){
      let objects = [];
      objCollection.forEach((e) => {
        objects.push(e.properties());
      });
      return objects;
    }

    async pickRelationships(relCollection) {
      let list = [];
      relCollection.forEach((r) => {
        let startNode = r.startNode();
        let endNode = r.endNode();
        list.push(endNode.properties());
      });
      return list;
    }

    async pickRelationship(relationModel, direction) {
      if(relationModel==null || relationModel==undefined ){
        return null;
      }
      if(direction == "start"){
        return relationModel.startNode().properties();
      } else {
        return relationModel.endNode().properties();
      }
    }



};

module.exports = DataService;
