
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE Actions
        ADD for_category bit
      
        ALTER TABLE Actions
        ADD action_type nvarchar(10)

        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE Actions
      DROP COLUMN for_category
      
      ALTER TABLE Actions
        DROP COLUMN action_type
        
         `      
 

 
      )
  }
};







