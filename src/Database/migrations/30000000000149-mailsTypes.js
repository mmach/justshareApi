"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
          CREATE TABLE MailTypesProjects
          (
            id char(36) PRIMARY KEY,
            translation_id char(36),
            mailsender_id char(36),
            mail_body_id char(36),
            mail_template_id char(36),
            mailtype_id char(36),
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
     DROP TABLE MailTypesProjects
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


