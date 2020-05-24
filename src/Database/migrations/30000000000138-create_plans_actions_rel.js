"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        ALTER TABLE [dbo].[PlansActions]  WITH CHECK ADD  CONSTRAINT [FK_PlansActions_Plans] FOREIGN KEY([plan_id])
        REFERENCES [dbo].[Plans] ([id])

        ALTER TABLE [dbo].[PlansActions]  WITH CHECK ADD  CONSTRAINT [FK_PlansActions_Actions] FOREIGN KEY([action_id])
        REFERENCES [dbo].[Actions] ([id])

        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[PlansActions]  DROP  CONSTRAINT [FK_PlansActions_Plans] 
      ALTER TABLE [dbo].[PlansActions]  DROP  CONSTRAINT [FK_PlansActions_Actions] 

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


