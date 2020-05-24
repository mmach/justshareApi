"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        CREATE TABLE PrivilegesProject(
          id char(36) PRIMARY KEY,
          privilege_id char(36),
          project_id char(36),
          status bit
        ) ON [PRIMARY]   


        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      DROP TABLE PrivilegesProject

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
