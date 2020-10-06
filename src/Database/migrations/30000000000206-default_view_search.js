

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

        ALTER TABLE Categories
        ADD  view_type nvarchar(50) 
  
        
    
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE Categories
      DROP COLUMN  view_type


           `
      )
  }
};







