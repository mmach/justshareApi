
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
         

        ALTER TABLE [dbo].[UserRoles]  WITH CHECK ADD  CONSTRAINT [FK_UserRoles_Projects] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id])

        ALTER TABLE [dbo].[UserRoles]  WITH CHECK ADD  CONSTRAINT [FK_UserRoles_Users] FOREIGN KEY([user_id])
        REFERENCES [dbo].[Users] ([id])

        ALTER TABLE [dbo].[UserRoles]  WITH CHECK ADD  CONSTRAINT [FK_UserRoles_RolesProject] FOREIGN KEY([role_id])
        REFERENCES [dbo].[RolesProject] ([id])
           `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
     
      ALTER TABLE [dbo].[UserRoles] DROP CONSTRAINT [FK_UserRoles_Projects]  
      ALTER TABLE [dbo].[UserRoles] DROP CONSTRAINT [FK_UserRoles_Users]  
      ALTER TABLE [dbo].[UserRoles] DROP CONSTRAINT [FK_UserRoles_RolesProject]  


   
     
 `
      )
  }
};







