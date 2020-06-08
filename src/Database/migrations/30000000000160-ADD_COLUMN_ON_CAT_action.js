"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        
        ALTER TABLE CategoryActions
        ADD  created_at   [datetimeoffset](7)
        
        ALTER TABLE CategoryActions
        ADD updated_at  [datetimeoffset](7)
        
          
        `
      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      
      ALTER TABLE CategoryActions
      DROP COLUMN created_at

      
      ALTER TABLE CategoryActions
      DROP COLUMN updated_at


             `
      )
  }
};
