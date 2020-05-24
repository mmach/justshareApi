"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        ALTER TABLE [dbo].[PrivilegesProject]  WITH CHECK ADD  CONSTRAINT [FK_PrivilegesProject_Privileges] FOREIGN KEY([privilege_id])
        REFERENCES [dbo].[Privileges] ([id])   

        ALTER TABLE [dbo].[PrivilegesProject]  WITH CHECK ADD  CONSTRAINT [FK_PrivilegesProject_Project] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id]) 
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[PrivilegesProject] DROP CONSTRAINT [FK_PrivilegesProject_Privileges]  
      ALTER TABLE [dbo].[PrivilegesProject] DROP CONSTRAINT [FK_PrivilegesProject_Project]  


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
