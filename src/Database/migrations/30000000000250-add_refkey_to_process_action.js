



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

        ALTER TABLE ProcessChainActionInjections
        ADD ref_key nvarchar(100)
       
        
        `

      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE ProcessChainActionInjections
      DROP COLUMN ref_key 
      

        `
      )
  }
};







