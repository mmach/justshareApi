

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

    
       ALTER TABLE Actions
       ADD as_process bit
      
  
        
    
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE Actions
      DROP COLUMN as_process
    

           `
      )
  }
};







