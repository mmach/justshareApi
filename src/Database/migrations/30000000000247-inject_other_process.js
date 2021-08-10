



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE ProcessChainActionInjections
        ADD external_process_id char(36)
        
        ALTER TABLE ProcessChainActionInjections
        ADD external_process_chain_id char(36)
        
        
        `

      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE ProcessChainActionInjections
      DROP COLUMN external_process_id 
      
      ALTER TABLE ProcessChainActionInjections
      DROP COLUMN external_process_chain_id 
             
        `
      )
  }
};







