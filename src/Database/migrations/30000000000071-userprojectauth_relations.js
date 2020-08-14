"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[UserProjectPrivileges]
        ADD privilege_id char(36)

        ALTER TABLE [dbo].[UserProjectPrivileges]  WITH CHECK ADD  CONSTRAINT [FK_UserProjectsPrivileges_PRIVILEGES] FOREIGN KEY([privilege_id])
        REFERENCES [dbo].[Privileges] ([id])
      
        
        `
      

      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[UserProjectPrivileges]
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
