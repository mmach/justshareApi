'use strict';


let fs = require('fs');


let Promise = require('bluebird');
let readline = require('readline')
const uuidv4 = require("uuid/v4");
let { CommandList, QueryList,ProcessList } = require('justshare-shared');
const { func } = require('prop-types');


// create instance of readline
// each instance is associated with single input stream



// event is emitted after each line
let str = [];
let save = async (queryInterface, name, type) => {
  let result = await queryInterface.sequelize.query(`SELECT * FROM Actions WHERE name='${name}'`);
  if (result[0].length == 0) {
    await queryInterface.bulkInsert('Actions', [{
      id: uuidv4()
      , name: name,
      action_type: type
    }]);
  }
}
let recSearch = (obj) => {
  Object.keys(obj).forEach(i => {
    if (typeof obj[i] == 'string') {
      str.push(obj[i])
    } else {
      recSearch(obj[i])
    }

  })

}
module.exports = {
  up: async (queryInterface, Sequelize) => {


    recSearch(CommandList)
    await Promise.mapSeries(str, async (obj) => {
      console.log(obj)
      return await save(queryInterface, obj, 'COMMAND')

    })
    str = []

    recSearch(QueryList)
    await Promise.mapSeries(str, async (obj) => {
      console.log(obj)
      return await save(queryInterface, obj, 'QUERY')

    })

    recSearch(ProcessList)
    await Promise.mapSeries(str, async (obj) => {
      console.log(obj)
      return await save(queryInterface, obj, 'PROCESS')

    })
    // await save(queryInterface, category, template);




  },

  down: (queryInterface, Sequelize) => {
    //return //queryInterface.bulkDelete('Continents', null, {});
  }
};
