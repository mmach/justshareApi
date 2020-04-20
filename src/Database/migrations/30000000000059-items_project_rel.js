"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[Items] 
        ADD project_id char(36)

        ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_Project] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id])
      
        
        `
      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[CategoryExternals] DROP CONSTRAINT [FK_Items_Project]  
      
      ALTER TABLE Items
      DROP COLUMN project_id

      `)
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
