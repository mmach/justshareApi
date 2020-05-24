"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        ALTER TABLE [dbo].[PlansRoles]  WITH CHECK ADD  CONSTRAINT [FK_PlansRoles_Plans] FOREIGN KEY([plan_id])
        REFERENCES [dbo].[Plans] ([id])

        ALTER TABLE [dbo].[PlansRoles]  WITH CHECK ADD  CONSTRAINT [FK_PlansRoles_Roles] FOREIGN KEY([role_id])
        REFERENCES [dbo].[Roles] ([id])

        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[PlansRoles]  DROP  CONSTRAINT [FK_PlansRoles_Roles] 
      ALTER TABLE [dbo].[PlansRoles]  DROP  CONSTRAINT [FK_PlansRoles_Plans] 

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


