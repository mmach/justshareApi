



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

        ALTER TABLE ProcessChains
        ADD is_autoclose_state bit
        
       `

      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE ProcessChains
      DROP COLUMN is_autoclose_state

     
        `
      )
  }
};







