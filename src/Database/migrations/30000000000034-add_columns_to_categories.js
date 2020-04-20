"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE Categories
        ADD expired_day bigint NULL

      
        `  
  

      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE Categories
      DROP COLUMN expired_day 

      
`)
  }
};
