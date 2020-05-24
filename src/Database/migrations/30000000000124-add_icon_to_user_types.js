
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE UserTypes
        ADD blob_id char(36)
      
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE UserTypes
      DROP COLUMN blob_id 
        
         `



      )
  }
};







