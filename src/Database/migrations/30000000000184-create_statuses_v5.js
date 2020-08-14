

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        
        ALTER TABLE [dbo].[StatusProjects]  WITH CHECK ADD  CONSTRAINT [FK_StatusProjects_Project] FOREIGN KEY([project_id])  REFERENCES [dbo].[Projects] ([id])
        ALTER TABLE [dbo].[StatusProjects]  WITH CHECK ADD  CONSTRAINT [FK_StatusProjects_StatusActions] FOREIGN KEY([status_id])  REFERENCES [dbo].[Statuses] ([id])
        ALTER TABLE [dbo].[StatusProjects]  WITH CHECK ADD  CONSTRAINT [FK_StatusProjects_Translations] FOREIGN KEY([translation_id])  REFERENCES [dbo].[Translations] ([id])

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[StatusProjects] DROP  CONSTRAINT [FK_StatusProjects_Project]
      ALTER TABLE [dbo].[StatusProjects]  DROP  CONSTRAINT [FK_StatusProjects_StatusActions] 
      ALTER TABLE [dbo].[StatusProjects]  DROP  CONSTRAINT [FK_StatusProjects_Translations]
    `
      )
  }
};







