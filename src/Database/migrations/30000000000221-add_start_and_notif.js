

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
      
     ALTER TABLE Actions
     ADD is_process_start bit

     ALTER TABLE ProcessChains
     ADD with_notification bit
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE Actions
      DROP COLUMN is_process_start
 
      ALTER TABLE ProcessChains
      DROP COLUMN with_notification
   
           `
      )
  }
};







