"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[MailTypes]  
        ADD body nvarchar(max)

        
        ALTER TABLE [dbo].[MailTypes]  
        ADD templateBody nvarchar(max)



        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[MailTypes]  
      DROP COLUMN templateBody

      
      ALTER TABLE [dbo].[MailTypes]  
      DROP COLUMN body

      `
      )
  }
};
