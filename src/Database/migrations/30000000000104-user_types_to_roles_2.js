"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        EXEC sp_rename 'UserTypesProject', 'RolesProject'

        ALTER TABLE [dbo].[RolesProject] DROP CONSTRAINT [FK_UserTypesProject_Translations]  

        ALTER TABLE ROlesProject
        DROP COLUMN translation_id
         
        EXEC sp_rename 'RolesProject.usertype_id', 'role_id', 'COLUMN';

        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      EXEC sp_rename 'RolesProject','UserTypesProject'



      ALTER TABLE UserTypesProject
      ADD translation_id char(36)

      ALTER TABLE [dbo].[UserTypesProject]  WITH CHECK ADD  CONSTRAINT [FK_UserTypesProject_Translations] FOREIGN KEY([translation_id])
      REFERENCES [dbo].[Translations] ([id]) 

      EXEC sp_rename 'UserTypesProject.role_id', 'usertype_id', 'COLUMN';


     
 `
      )
  }
};



