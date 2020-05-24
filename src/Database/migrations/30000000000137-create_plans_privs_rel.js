"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        ALTER TABLE [dbo].[PlansPrivileges]  WITH CHECK ADD  CONSTRAINT [FK_PlansPrivileges_Plans] FOREIGN KEY([plan_id])
        REFERENCES [dbo].[Plans] ([id])

        ALTER TABLE [dbo].[PlansPrivileges]  WITH CHECK ADD  CONSTRAINT [FK_PlansPrivileges_Privileges] FOREIGN KEY([privilege_id])
        REFERENCES [dbo].[Privileges] ([id])

        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[PlansPrivileges]  DROP  CONSTRAINT [FK_PlansPrivileges_Plans] 
      ALTER TABLE [dbo].[PlansPrivileges]  DROP  CONSTRAINT [FK_PlansPrivileges_Privileges] 

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


