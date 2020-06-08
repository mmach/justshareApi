"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
          CREATE TABLE MailParts
          (
            id char(36) PRIMARY KEY,
            project_id char(36),
            name nvarchar(100),
            type nvarchar(20),
            body nvarchar(max),
            [created_at] [datetimeoffset](7) NULL,
             [updated_at] [datetimeoffset](7) NULL
                  ) ON [PRIMARY]   
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
     DROP TABLE MailParts
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


