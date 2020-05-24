"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[LanguageProject]  WITH CHECK ADD  CONSTRAINT [FK_LanguageProject_Language] FOREIGN KEY([language_id])
        REFERENCES [dbo].[Language] ([id])   

        ALTER TABLE [dbo].[LanguageProject]  WITH CHECK ADD  CONSTRAINT [FK_LanguageProject_Project] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id]) 
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[LanguageProject] DROP CONSTRAINT [FK_LanguageProject_Language]  
      ALTER TABLE [dbo].[LanguageProject] DROP CONSTRAINT [FK_LanguageProject_Project]  


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
