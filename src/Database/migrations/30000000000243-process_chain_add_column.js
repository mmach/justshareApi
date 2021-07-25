



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

     

        
        
        ALTER TABLE ProcessChains
        ADD reminder_cron nvarchar(20)

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
     
      
      ALTER TABLE ProcessChains
      DROP COLUMN reminder_cron 
      `
      )
  }
};







