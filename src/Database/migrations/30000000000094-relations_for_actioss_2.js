"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        ALTER TABLE [dbo].[PrivilegesAction]  WITH CHECK ADD  CONSTRAINT [FK_PrivilegesAction_PrivilegesProject] FOREIGN KEY([privilege_id])
        REFERENCES [dbo].[PrivilegesProject] ([id])   

        ALTER TABLE [dbo].[PrivilegesAction]  WITH CHECK ADD  CONSTRAINT [FK_PrivilegesAction_Project] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id]) 
       
        ALTER TABLE [dbo].[PrivilegesAction]  WITH CHECK ADD  CONSTRAINT [FK_PrivilegesAction_ActionsProject] FOREIGN KEY([action_id])
        REFERENCES [dbo].[ActionsProject] ([id]) 
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[PrivilegesAction] DROP CONSTRAINT [FK_PrivilegesAction_PrivilegesAction] 
      ALTER TABLE [dbo].[PrivilegesAction] DROP CONSTRAINT [FK_PrivilegesAction_Project]  
      ALTER TABLE [dbo].[PrivilegesAction] DROP CONSTRAINT [FK_PrivilegesAction_ActionsProject]  
 

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
