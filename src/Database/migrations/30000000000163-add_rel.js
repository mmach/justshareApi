"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
             ALTER TABLE [dbo].[ItemUserAction]  WITH CHECK ADD  CONSTRAINT [FK_ItemUserAction_Projects] FOREIGN KEY([project_id])
          REFERENCES [dbo].[Projects] ([id])

          ALTER TABLE [dbo].[ItemUserAction]  WITH CHECK ADD  CONSTRAINT [FK_ItemUserAction_ItemUserAction] FOREIGN KEY([iua_id])
          REFERENCES [dbo].[ItemUserAction] ([id])

          ALTER TABLE [dbo].[ItemUserAction]  WITH CHECK ADD  CONSTRAINT [FK_ItemUserAction_Items] FOREIGN KEY([item_id])
          REFERENCES [dbo].[Items] ([id])


          ALTER TABLE [dbo].[ItemUserAction]  WITH CHECK ADD  CONSTRAINT [FK_ItemUserAction_Users] FOREIGN KEY([user_id])
          REFERENCES [dbo].[Users] ([id])
   
          ALTER TABLE [dbo].[ItemUserAction]  WITH CHECK ADD  CONSTRAINT [FK_ItemUserAction_ActionsProjects] FOREIGN KEY([action_id])
          REFERENCES [dbo].[ActionsProjects] ([id])

          ALTER TABLE [dbo].[ItemCategoryOptions]  WITH CHECK ADD  CONSTRAINT [FK_ItemCategoryOptions_ItemUserAction] FOREIGN KEY([iua_id])
          REFERENCES [dbo].[ItemUserAction] ([id])
        `
      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
          
      ALTER TABLE [dbo].[ItemUserAction]   DROP CONSTRAINT [FK_ItemUserAction_Projects]

      ALTER TABLE [dbo].[ItemUserAction]   DROP CONSTRAINT [FK_ItemUserAction_ItemUserAction]

      ALTER TABLE [dbo].[ItemUserAction]  DROP CONSTRAINT [FK_ItemUserAction_Items]

      ALTER TABLE [dbo].[ItemUserAction]   DROP CONSTRAINT [FK_ItemUserAction_Users]

      ALTER TABLE [dbo].[ItemUserAction]  DROP CONSTRAINT [FK_ItemUserAction_ActionsProjects]

      ALTER TABLE [dbo].[ItemCategoryOptions]  DROP CONSTRAINT [FK_ItemCategoryOptions_ItemUserAction]

            
        

             `
      )
  }
};
