

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
      

      ALTER TABLE [ProcessChains]
      ADD is_start bit

      ALTER TABLE [ProcessChains]
      ADD is_last bit
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [ProcessChains]
      DROP COLUMN is_start

      ALTER TABLE [ProcessChains]
      DROP COLUMN is_last 
   
           `
      )
  }
};







