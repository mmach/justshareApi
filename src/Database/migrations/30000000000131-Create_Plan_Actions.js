"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
       CREATE TABLE PlansActions  ( 
         id char(36) PRIMARY KEY,
         action_id char(36),
         plan_id char(36),
         [created_at] [datetimeoffset](7) NULL,
          [updated_at] [datetimeoffset](7) NULL
               ) ON [PRIMARY]   

        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

    DROP TABLE PlansActions
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


