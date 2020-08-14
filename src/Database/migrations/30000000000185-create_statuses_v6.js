

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
    
        ALTER TABLE ItemUserActions
        ADD status_id char(36)

        ALTER TABLE ItemUserActions
        ADD iua_prev_id char(36)

        ALTER TABLE [dbo].[ItemUserActions]  WITH CHECK ADD  CONSTRAINT [FK_ItemUserActions_StatusProjects] FOREIGN KEY([status_id])  REFERENCES [dbo].[StatusProjects] ([id])
        ALTER TABLE [dbo].[ItemUserActions]  WITH CHECK ADD  CONSTRAINT [FK_ItemUserActions_ItemUserActions_PREV] FOREIGN KEY([iua_prev_id])  REFERENCES [dbo].[ItemUserActions] ([id])


      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[ItemUserActions] DROP  CONSTRAINT [FK_ItemUserActions_ItemUserActions_PREV] 

      ALTER TABLE [dbo].[ItemUserActions]  DROP  CONSTRAINT [FK_ItemUserActions_StatusProjects] 
    
       
        ALTER TABLE ItemUserActions
        DROP COLUMN  iua_prev_id 

        ALTER TABLE ItemUserActions
        DROP COLUMN status_id 

        
    
        `
      )
  }
};







