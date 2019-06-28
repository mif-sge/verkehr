'use strict';
const DataService = require('./dataService');

class DataFassade {

 constructor(){
    this.data = new DataService();
  }
 getAllBusLinesShort(){
    //let busLines = this.data.getAllWithRelations();
  }
  getAllBusLines(){

  }

  getAllBusStopsShort(){

  }

  getAllBusStops(){

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
  getAllPoI(){
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
        return  allPois;
      }).then(result => {
        resolve(result);
      })
      .catch(err => {
          console.log(err);
          reject(err);
      });
    });
  }
  getAllHospitals(){

  }

  getAllShops(){

  }

  getAllSchools(){

  }

}
module.exports = DataFassade;
