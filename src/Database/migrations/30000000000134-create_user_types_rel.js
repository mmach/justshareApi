"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        ALTER TABLE [dbo].[PlansUserTypes]  WITH CHECK ADD  CONSTRAINT [FK_PlansUserTypes_Plans] FOREIGN KEY([plan_id])
        REFERENCES [dbo].[Plans] ([id])

        ALTER TABLE [dbo].[PlansUserTypes]  WITH CHECK ADD  CONSTRAINT [FK_PlansUserTypes_Translations] FOREIGN KEY([translation_id])
        REFERENCES [dbo].[Translations] ([id])

        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[PlansUserTypes]  DROP  CONSTRAINT [FK_PlansUserTypes_Plans] 
      ALTER TABLE [dbo].[PlansUserTypes]  DROP  CONSTRAINT [FK_PlansUserTypes_Translations] 

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


