"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        CREATE TABLE PrivilegesAction(
          id char(36) PRIMARY KEY,
          privilege_id char(36),
          project_id char(36),
          action_id char(36),
          logical_op char(1),
          status bit
        ) ON [PRIMARY]   


        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      DROP TABLE PrivilegesAction

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
