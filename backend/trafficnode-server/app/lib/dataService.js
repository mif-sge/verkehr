const con = require('./database/connection');

/**
 * A test class.
 */
class DataService {

    /**
     * Tries to connect to a running instance of neo4j as defined in the environment file and return
     * all Entities with defined Labels without relationships
     * If the database can't be reached, the request will be terminated after the globally set timeout.
     * @returns {Promise<StatementResult>} A promise to all records. returned format: json with Entities  or error
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
       * Tries to connect to a running instance of neo4j as defined in the environment file and returns
       * all Entities with defined Labels and defined relations, if no relation is defined, returns all available relations for this Entity
       * If the database can't be reached, the request will be terminated after the globally set timeout.
       * @param  {[type]}  modelName Entity Label in data base
       * @param  {[type]}  relations array with required names of relationships
       * @return {Promise}  A promise to all records. returned format: json with Entities  or error
       */
    async getAllWithRelations(modelName, relations) {
        try{
          let res = await con.model(modelName).all();
          let objWithRel = this.pickObjectsWithRelations(res, relations);
          return objWithRel;
        }catch(err){
          console.log(err);
          return err;
        }
    }
    /**
     * Returns Objects from given neode Collection and related relationships
     * @param  {[type]}  objCollection neode Collection
     * @param  {[type]}  relations     array with required names of relationships
     * @return {Promise} A promise to all records. returns json with Entities  or error
     */
    pickObjectsWithRelations(objCollection, relations){
      let objects =  [];
      objCollection.forEach((e) => {
        let ename = e.model().name();
        let json = {
        }
        json[ename] = e.properties();
        let relationships = e.model().eager();
        for(const relation of relationships) {
          let relName = relation.name();
          if(Array.isArray(relations) && relations.length > 0 && !relations.includes(relName)){
            continue;
          }
          let relationModel = e.get(relName);
          if(relation.type() == "relationships" ) {
            json[relation.name()] = this.pickRelationships(relationModel);
          } else {
            if(relation.direction() == 'DIRECTION_IN'){
              json[relation.name()] = this.pickRelationship(relationModel, "start");
            } else{
              json[relation.name()] = this.pickRelationship(relationModel, "end");
            }
          }
        }
        objects.push(json);
      });
      return objects;
    }
    /**
     * Picks Objects from given neode Collection without relations
     * @param  {[type]}  objCollection neode Collection
     * @return {Promise}              A promise to all records. Returns json with Entities  or error
     */
    async pickObjects(objCollection){
      let objects = [];
      objCollection.forEach((e) => {
        objects.push(e.properties());
      });
      return objects;
    }

  /**
   * Picks the properties from neode Collection of relationships and returns this als JSON
   * @param  {[type]}  relCollection neode Collection of relationships
   * @return {Promise}               A promise to all records. Returns json with Relations or error
   */
    pickRelationships(relCollection) {
      let list = [];
      relCollection.forEach((r) => {
        let startNode = r.startNode();
        let endNode = r.endNode();
        list.push(endNode.properties());
      });
      return list;
    }

    /**
     * Picks the properties from single neode relationships and returns this als JSON
     * @param  {[type]}  relationModel neode relationship
     * @param  {[type]}  direction     direction of relationship ('end' or 'start':  startNode -> endNode)
     * @return {Promise}                A promise to record. Returns json with Relation  or error
     */
  pickRelationship(relationModel, direction) {
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
