
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
         

        ALTER TABLE [dbo].[UserTypeRoles]  WITH CHECK ADD  CONSTRAINT [FK_UserTypeRoles_Projects] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id])

        ALTER TABLE [dbo].[UserTypeRoles]  WITH CHECK ADD  CONSTRAINT [FK_UserTypeRoles_UserTypes] FOREIGN KEY([usertype_id])
        REFERENCES [dbo].[UserTypes] ([id])

        ALTER TABLE [dbo].[UserTypeRoles]  WITH CHECK ADD  CONSTRAINT [FK_UserTypeRoles_RolesProject] FOREIGN KEY([role_id])
        REFERENCES [dbo].[RolesProject] ([id])
           `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
     
      ALTER TABLE [dbo].[UserTypeRoles] DROP CONSTRAINT [FK_UserTypeRoles_Projects]  
      ALTER TABLE [dbo].[UserTypeRoles] DROP CONSTRAINT [FK_UserTypeRoles_UserTypes]  
      ALTER TABLE [dbo].[UserTypeRoles] DROP CONSTRAINT [FK_UserTypeRoles_RolesProject]  


   
     
 `
      )
  }
};







