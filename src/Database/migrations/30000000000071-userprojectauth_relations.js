"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[UserProjectsPrivileges]
        ADD privilege_id char(36)

        ALTER TABLE [dbo].[UserProjectsPrivileges]  WITH CHECK ADD  CONSTRAINT [FK_UserProjectsPrivileges_PRIVILEGES] FOREIGN KEY([privilege_id])
        REFERENCES [dbo].[Privileges] ([id])
      
        
        `
      

      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[UserProjectsPrivileges]
      DROP COLUMN privilege_id `
      )
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
