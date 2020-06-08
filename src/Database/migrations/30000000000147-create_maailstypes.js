"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
          CREATE TABLE MailTypes
          (
            id char(36) PRIMARY KEY,
            token nvarchar(100),
            description nvarchar(1000),
            bodyPayload nvarchar(max),
            templatePayload nvarchar(max),
            [created_at] [datetimeoffset](7) NULL,
             [updated_at] [datetimeoffset](7) NULL
                  ) ON [PRIMARY]   
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
     DROP TABLE MailTypes
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


