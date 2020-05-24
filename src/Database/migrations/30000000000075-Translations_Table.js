"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
       CREATE TABLE Translations(
       id char(36) PRIMARY KEY,
       name nvarchar(1000),
       pl nvarchar(1000),
       us nvarchar(1000),
       de nvarchar(1000),
       no nvarchar(1000),
       zh_cn nvarchar(1000),
       fr nvarchar(1000),
       es nvarchar(1000),
       ru nvarchar(1000),
       [created_at] [datetimeoffset](7) NULL,
       [updated_at] [datetimeoffset](7) NULL
     ) ON [PRIMARY]   

        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      DROP TABLE Translations
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
