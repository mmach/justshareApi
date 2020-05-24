"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[UserTypesProject]  WITH CHECK ADD  CONSTRAINT [FK_UserTypesProject_UserTypes] FOREIGN KEY([usertype_id])
        REFERENCES [dbo].[UserTypes] ([id])   

        ALTER TABLE [dbo].[UserTypesProject]  WITH CHECK ADD  CONSTRAINT [FK_UserTypesProject_Project] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id]) 

        ALTER TABLE [dbo].[UserTypesProject]  WITH CHECK ADD  CONSTRAINT [FK_UserTypesProject_Translations] FOREIGN KEY([translation_id])
        REFERENCES [dbo].[Translations] ([id]) 

        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[UserTypesProject] DROP CONSTRAINT [FK_UserTypesProject_Translations]  
      ALTER TABLE [dbo].[UserTypesProject] DROP CONSTRAINT [FK_UserTypesProject_Project]  
      
      ALTER TABLE [dbo].[UserTypesProject] DROP CONSTRAINT [FK_UserTypesProject_UserTypes]  


 `
      )
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
