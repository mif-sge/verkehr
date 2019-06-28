'use strict';
const DataService = require('./dataService');

class DataFassade {

 constructor(){
    this.data = new DataService();
    this.jsonKeysMap = {
      "Hospital": "hospitals",
      "Shop": "shops",
      "School": "schools",
      "Bus_Line": "buslines",
      "Bus_Stop": "busstops"
    }
  }
  /**
   * Formats data to JSON with PoIs
   * @param  {[type]} data   JSON with PoIs, contained defined  label name of reqired PoI
   * @param  {[type]} labelName  of PoI
   * @return {[type]}           formated JSON
   */
  formatePoIs(data, labelName){
    let pois = [];
    data.forEach(r => {
      let h = r[labelName];
      if(r.locatesOn != null){
        h.lat = r.locatesOn.latitude;
        h.lon=r.locatesOn.longitude;
      }
      pois.push(h);
    })
    return pois;
  }
  /**
   * Requests DataService for all PoIs, formats and returns these
   * @return {Promise} A promise to all records. returned format: formated json with Entities  or error
   */
  async getAllPoI(){
    return new Promise((resolve,reject) => {
      let allPois={};
      this.data.getAllWithRelations('Hospital').then(result => {
        allPois["hospitals"] = this.formatePoIs(result, "Hospital");
        return this.data.getAllWithRelations('Shop');
      }).then(result => {
        allPois["shops"] = this.formatePoIs(result, "Shop");
        return this.data.getAllWithRelations('School');
      }).then(result => {
        allPois["schools"] = this.formatePoIs(result, "School");
        return this.data.getAllWithRelations('Bus_Line');
      }).then(result => {
        allPois["busstops"] = this.formatePoIs(result, "Bus_Stop");
        return allPois;
      }).then(result => {
        resolve(result);
      })
      .catch(err => {
          console.log(err);
          reject(err);
      });
    });
  }

  async getPoIByLabel(labelName){
    try{
      let pois={};
      let result = await this.data.getAllWithRelations(labelName);
      pois[this.jsonKeysMap[labelName]] = this.formatePoIs(result, labelName);
      return pois;
    }catch(err){
      console.log(err);
      return err;
    }
  }

  /**
   * Requests DataService for all bus lines, formats and returns these
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  formateBuslines(data){
    let lines = [];
    data.forEach(r => {
      let h = r["Bus_Line"];
      if(r.serves != null){
        h.busstops=[];
        r.serves.forEach(bs => {
          h.busstops.push(bs.id);
        })
      }
      h.coordinates=[];
      if(r.viaPosition != null){
        r.viaPosition.forEach(c => {
          h.coordinates.push({lat: c.latitude , lon: c.longitude});
        })
      }
      if(r.viaStreet != null){
        r.viaPosition.forEach(s => {
          h.coordinates.push({streetId: s.id , streetName: s.name});
        })
      }
    lines.push(h);
    })
    return lines;
  }

  /**
   * Formats data to JSON with bus lines
   * @return {Promise} [description]
   */
  async getAllBuslines(){
    let labelName = "Bus_Line";
    try{
      let lines=[];
      let result = await this.data.getAllWithRelations(labelName);
      lines =this.formateBuslines(result);
      return lines;
    }catch(err){
      console.log(err);
      return err;
    }
  }

}
module.exports = DataFassade;
