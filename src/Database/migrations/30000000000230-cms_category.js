

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[Categories]
      DROP 
      COLUMN params ,
      COLUMN preview_desktop ,
      COLUMN preview_mobile 
 
     

     ALTER TABLE [dbo].[Categories]
     ADD  
       cms_preview nvarchar(max),
       cms_create nvarchar(max),
       cms_edit nvarchar(max),
       cms_search nvarchar(max)

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
    
      ALTER TABLE [dbo].[Categories]
      ADD params nvarchar(max),
      preview_desktop nvarchar(255),
      preview_mobile nvarchar(255)
  
      

      ALTER TABLE [dbo].[Categories]
      DROP COLUMN cms_preview 

      ALTER TABLE [dbo].[Categories]
      DROP COLUMN cms_create 

      ALTER TABLE [dbo].[Categories]
      DROP COLUMN cms_edit

      ALTER TABLE [dbo].[Categories]
      DROP COLUMN cms_search 

   
           `
      )
  }
};







