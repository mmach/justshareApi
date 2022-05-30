



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

        ALTER TABLE ProcessChainActionInjections
        ADD on_before_hook bit
        
        ALTER TABLE ProcessChainActionInjections
        ADD on_after_hook bit
        
        `

      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE ProcessChainActionInjections
      DROP COLUMN on_after_hook 
      ALTER TABLE ProcessChainActionInjections
      DROP COLUMN on_before_hook 

        `
      )
  }
};







