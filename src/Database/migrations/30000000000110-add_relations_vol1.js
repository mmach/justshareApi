
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
         

        ALTER TABLE [dbo].[UserTypes]  WITH CHECK ADD  CONSTRAINT [FK_UserTypes_Projects] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id])

        ALTER TABLE [dbo].[UserTypes]  WITH CHECK ADD  CONSTRAINT [FK_UserTypes_Translations] FOREIGN KEY([translation_id])
        REFERENCES [dbo].[Translations] ([id])
           `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
     
      ALTER TABLE [dbo].[UserTypes] DROP CONSTRAINT [FK_UserTypes_Translations]  
      ALTER TABLE [dbo].[UserTypes] DROP CONSTRAINT [FK_UserTypes_Projects]  

   
     
 `
      )
  }
};







