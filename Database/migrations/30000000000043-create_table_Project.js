"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        CREATE TABLE [dbo].[Projects](
          id char(36) PRIMARY KEY,
          name nvarchar(150),
          user_id char(36),
          secretKey nvarchar(300), 
          project_id char(36),
          [created_at] [datetimeoffset](7) NULL,
          [updated_at] [datetimeoffset](7) NULL
        ) ON [PRIMARY]      
        `
        /**
         * 
              ALTER TABLE CategoryOptions
              ADD is_func nvarchar(1000) NULL
      
              ALTER TABLE CategoryOptions
              ADD func nvarchar(1000) NULL
      
         */

      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      DROP TABLE [dbo].[Projects]
      
`)
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
