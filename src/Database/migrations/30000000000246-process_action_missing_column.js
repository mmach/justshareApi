



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE ProcessChainActionInjections
        ADD sort_order int
        
        ALTER TABLE ProcessChainActionInjections
        ADD show_on_current bit
        
        ALTER TABLE ProcessChainActionInjections
        ADD show_on_next bit 
        `


      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE ProcessChainActionInjections
      DROP COLUMN sort_order 
      
      ALTER TABLE ProcessChainActionInjections
      DROP COLUMN show_on_current
    
      ALTER TABLE ProcessChainActionInjections
      DROP COLUMN show_on_next 
     
             
        `
      )
  }
};







