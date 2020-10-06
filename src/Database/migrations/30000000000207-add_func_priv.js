

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

        ALTER TABLE ActionsProjects
        ADD  func nvarchar(50) 
  
        
    
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE ActionsProjects
      DROP COLUMN  func 

           `
      )
  }
};







