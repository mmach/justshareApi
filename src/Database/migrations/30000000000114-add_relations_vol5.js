
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
         
        
        ALTER TABLE [dbo].[RolesProject]  WITH CHECK ADD  CONSTRAINT [FK_RolesProject_Projects] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id])

        ALTER TABLE [dbo].[RolesProject]  WITH CHECK ADD  CONSTRAINT [FK_RolesProject_Roles] FOREIGN KEY([role_id])
        REFERENCES [dbo].[Roles] ([id])
           `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
     
      ALTER TABLE [dbo].[RolesProject] DROP CONSTRAINT usertype_id  
      ALTER TABLE [dbo].[RolesProject] DROP CONSTRAINT usertype_id  



   
     
 `
      )
  }
};







