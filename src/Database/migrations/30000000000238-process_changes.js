



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
      ALTER TABLE [ProcessChains]
        DROP COLUMN  with_notification

      ALTER TABLE [ProcessChains]
        DROP COLUMN  popup_type
      

        EXEC sp_rename 'dbo.ProcessChains.get_iua_es', 'use_es', 'COLUMN';  


        EXEC sp_rename 'dbo.ProcessChains.with_iua_status_change', 'change_status', 'COLUMN';  

      ALTER TABLE [ProcessChains]
        ADD params nvarchar(max)

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
    
           `
      )
  }
};







