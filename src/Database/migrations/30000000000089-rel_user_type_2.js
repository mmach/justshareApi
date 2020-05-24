"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
      ALTER TABLE [dbo].[UserTypesUser] DROP CONSTRAINT [FK_UserProjectsPrivileges_PRIVILEGES]
     


        ALTER TABLE [dbo].[UserTypesUser]  WITH CHECK ADD  CONSTRAINT [FK_UserTypesUser_UserTypesProject] FOREIGN KEY([usertype_id])
        REFERENCES [dbo].[UserTypesProject] ([id]) 


        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[UserTypesUser] DROP CONSTRAINT [FK_UserTypesUser_UserTypesProject]  
      ALTER TABLE [dbo].[UserTypesUser]  WITH CHECK ADD  CONSTRAINT [FK_UserProjectsPrivileges_PRIVILEGES] FOREIGN KEY([usertype_id])
REFERENCES [dbo].[UserTypes] ([id]) 


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
