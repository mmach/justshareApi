

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        
        ALTER TABLE [dbo].[StatusActions]  WITH CHECK ADD  CONSTRAINT [FK_StatusActions_StatusProjects] FOREIGN KEY([status_id])  REFERENCES [dbo].[StatusProjects] ([id])

        ALTER TABLE [dbo].[StatusActions]  WITH CHECK ADD  CONSTRAINT [FK_StatusActions_ActionsProjects] FOREIGN KEY([action_id])  REFERENCES [dbo].[ActionsProjects] ([id])

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[StatusActions] DROP  CONSTRAINT [FK_StatusActions_StatusProjects] 

      ALTER TABLE [dbo].[StatusActions] DROP  CONSTRAINT [FK_StatusActions_ActionsProjects] 
    `
      )
  }
};







