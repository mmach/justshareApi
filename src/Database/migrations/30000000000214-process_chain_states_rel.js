

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

         ALTER TABLE ProcessChainStates
         ADD next_process_chain_id char(36)
        



      
  
        
    
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE ProcessChainStates
      DROP COLUMN next_process_chain_id     

           `
      )
  }
};







