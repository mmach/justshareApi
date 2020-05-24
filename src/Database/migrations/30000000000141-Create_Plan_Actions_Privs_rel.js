"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        ALTER TABLE [dbo].[PlansActionsPrivileges]  WITH CHECK ADD  CONSTRAINT [FK_PlansActionsPrivileges_Privileges] FOREIGN KEY([privilege_id])
        REFERENCES [dbo].[Privileges] ([id])

        ALTER TABLE [dbo].[PlansActionsPrivileges]  WITH CHECK ADD  CONSTRAINT [FK_PlansActionsPrivileges_Actions] FOREIGN KEY([action_id])
        REFERENCES [dbo].[Actions] ([id])


        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[PlansActionsPrivileges]  DROP  CONSTRAINT [FK_PlansActionsPrivileges_Privileges] 
      ALTER TABLE [dbo].[PlansActionsPrivileges]  DROP  CONSTRAINT [FK_PlansActionsPrivileges_Actions] 
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


