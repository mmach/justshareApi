

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
    
        ALTER TABLE [dbo].[ItemUserActions]
        ADD uniq_number nvarchar(200)

        
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[ItemUserActions]
      DROP COLUMN uniq_number
    


        
    
        `
      )
  }
};







