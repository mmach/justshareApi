"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[ItemCategoryOptions]  WITH CHECK ADD  CONSTRAINT [FK_ICO_Items] FOREIGN KEY([item_id])
        REFERENCES [dbo].[Items] ([id])
      
        `
      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[CategoryExternals] DROP CONSTRAINT [FK_ICO_Items]

      
`)
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
