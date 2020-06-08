"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
          CREATE TABLE MailSenders
          (
            id char(36) PRIMARY KEY,
            translation_id char(36),
            email nvarchar(200),
            password nvarchar(200),
            sendgrid_key nvarchar(400),
            smtp_host nvarchar(200),
            smtp_port nvarchar(200),
            smtp_security nvarchar(200), 
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
     DROP TABLE MailSenders
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


