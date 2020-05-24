"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        ALTER TABLE [dbo].[PlansUserTypesRoles]  WITH CHECK ADD  CONSTRAINT [FK_PlansUserTypesRoles_PlansUserTypes] FOREIGN KEY([user_type_id])
        REFERENCES [dbo].[PlansUserTypes] ([id])

        ALTER TABLE [dbo].[PlansUserTypesRoles]  WITH CHECK ADD  CONSTRAINT [FK_PlansUserTypesRoles_Roles] FOREIGN KEY([role_id])
        REFERENCES [dbo].[Roles] ([id])

        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[PlansUserTypesRoles]  DROP  CONSTRAINT [FK_PlansUserTypesRoles_PlansUserTypes] 
      ALTER TABLE [dbo].[PlansUserTypesRoles]  DROP  CONSTRAINT [FK_PlansUserTypesRoles_Roles] 

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


