

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
      
 
     ALTER TABLE ProcessChains
     ADD with_iua_status_change bit

     
     ALTER TABLE ProcessChains
     ADD get_iua_es bit


      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE ProcessChains
      drop column with_iua_status_change 
 
      
      ALTER TABLE ProcessChains
      drop column get_iua_es 
   
           `
      )
  }
};







