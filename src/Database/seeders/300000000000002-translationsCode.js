'use strict';


let fs = require('fs');

let uuidv4 = require("uuid/v4");

let Promise = require('bluebird');


// create instance of readline
// each instance is associated with single input stream


let line_no = 0;

// event is emitted after each line

module.exports = {
  up: async (queryInterface, Sequelize) => {


    // console.dir(result);
    //});
    let elements = [];
    let test = fs.readFileSync('./../../CodeDictionary.json');

    let obj = JSON.parse(test)
    Object.keys(obj).map(item => {
      Object.keys(obj[item]).map(element => {
        //console.log(obj[item][element].message)
        elements.push({
          id: uuidv4(),
          name:obj[item][element].message['pl'],
          pl:obj[item][element].message['pl'],
          us:obj[item][element].message['us'],
          de:obj[item][element].message['de'],
          no:obj[item][element].message['no'],
          zh_cn:obj[item][element].message["zh_cn"],
          fr:obj[item][element].message['fr'],
          es:obj[item][element].message['es'],
          ru:obj[item][element].message['ru'],
          project_id:'9C4D23EE-898C-49A7-94FC-DDA5596F1F00',
          token:element,
          respStatus:obj[item][element].status,
          type:item
        })
      })
    })

    console.log(elements)
    /*
        countries.push({
          uid: lineobj[0],
          name: lineobj[1],
          clear_name: lineobj[2],
          name_clob: lineobj[3],
          latitude: lineobj[4],
          longitude: lineobj[5]
        })*/
    // console.log(obj)



  
        await Promise.mapSeries(elements, async country => {
  
          return queryInterface.bulkInsert('Translations', [country]);
        });
    
    
   
     
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Continents', null, {});
  }
};
