"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        CREATE TABLE [dbo].[CategoryProject](
          id char(36) PRIMARY KEY,
          category_id char(36),
          project_id char(36),
          [created_at] [datetimeoffset](7) NULL,
          [updated_at] [datetimeoffset](7) NULL
        ) ON [PRIMARY]      
        `
      

      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      DROP TABLE [dbo].[CategoryProject]
      
`)
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
