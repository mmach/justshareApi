"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        DROP TABLE dbo.CategoryDimensionProject

        
        CREATE TABLE [dbo].[Dimensions](
          id char(36) PRIMARY KEY,
          name nvarchar(200),
          uniq_name nvarchar(200),
          description nvarchar(200),
          [created_at] [datetimeoffset](7) NULL,
          [updated_at] [datetimeoffset](7) NULL
        ) ON [PRIMARY]      
        `
      

      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      DROP TABLE [dbo].[Dimensions]  
`)
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
