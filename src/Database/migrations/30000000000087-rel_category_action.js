"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[ActionsProject]  WITH CHECK ADD  CONSTRAINT [FK_ActionsProject_Actions] FOREIGN KEY([action_id])
        REFERENCES [dbo].[Actions] ([id])   

        ALTER TABLE [dbo].[ActionsProject]  WITH CHECK ADD  CONSTRAINT [FK_ActionsProject_Project] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id]) 

        ALTER TABLE [dbo].[CategoryActions]  WITH CHECK ADD  CONSTRAINT [FK_CategoryActions_Categories] FOREIGN KEY([category_id])
        REFERENCES [dbo].[Categories] ([id]) 

        ALTER TABLE [dbo].[CategoryActions]  WITH CHECK ADD  CONSTRAINT [FK_CategoryActions_ActionsProject] FOREIGN KEY([actions_project_id])
        REFERENCES [dbo].[Categories] ([id]) 
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[ActionsProject] DROP CONSTRAINT [FK_ActionsProject_Actions]  
      ALTER TABLE [dbo].[ActionsProject] DROP CONSTRAINT [FK_ActionsProject_Project]  
      
      ALTER TABLE [dbo].[ActionsProject] DROP CONSTRAINT [FK_CategoryActions_Categories]  
      ALTER TABLE [dbo].[ActionsProject] DROP CONSTRAINT [FK_CategoryActions_ActionsProject]  


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
