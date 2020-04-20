"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[ItemCategoryOptions]  WITH CHECK ADD  CONSTRAINT [FK_ICO_COT] FOREIGN KEY([co_temp_id])
        REFERENCES [dbo].[CategoryOptionsTemplates] ([id])
      
        `
      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[CategoryExternals] DROP CONSTRAINT [FK_ICO_COT]  
`)
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
