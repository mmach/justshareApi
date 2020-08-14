

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
    
        ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_Users] FOREIGN KEY([user_id])  REFERENCES [dbo].[Users] ([id])
        ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_Users_SRC] FOREIGN KEY([user_src_id])  REFERENCES [dbo].[Users] ([id])
        ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_ItemUserActions] FOREIGN KEY([iua_id])  REFERENCES [dbo].[ItemUserActions] ([id])
        ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_Items] FOREIGN KEY([item_id])  REFERENCES [dbo].[Items] ([id])
        ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_Project] FOREIGN KEY([project_id])  REFERENCES [dbo].[Projects] ([id])
        ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_ActionsProjects] FOREIGN KEY([action_id])  REFERENCES [dbo].[ActionsProjects] ([id])


      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[Comments]  DROP CONSTRAINT [FK_Comments_Users] 
      ALTER TABLE [dbo].[Comments]  DROP CONSTRAINT [FK_Comments_Users_SRC] 
      ALTER TABLE [dbo].[Comments]  DROP CONSTRAINT [FK_Comments_ItemUserActions] 
      ALTER TABLE [dbo].[Comments]  DROP CONSTRAINT [FK_Comments_Items] 
      ALTER TABLE [dbo].[Comments]  DROP CONSTRAINT [FK_Comments_Project] 
      ALTER TABLE [dbo].[Comments]  DROP CONSTRAINT [FK_Comments_ActionsProjects]       


        
    
        `
      )
  }
};







