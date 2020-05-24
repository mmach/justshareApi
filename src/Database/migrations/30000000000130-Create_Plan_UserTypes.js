"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
       CREATE TABLE PlansUserTypes ( 
         id char(36) PRIMARY KEY,
         plan_id char(36),
         name nvarchar(360),
         translation_id char(36),
         price nvarchar(36),
         [created_at] [datetimeoffset](7) NULL,
         [updated_at] [datetimeoffset](7) NULL
              ) ON [PRIMARY]   

        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

    DROP TABLE PlansUserTypes
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


