"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        DROP TABLE UserTypes

        EXEC sp_rename 'Privileges', 'UserTypes'
        EXEC sp_rename 'UserProjectPrivileges', 'UserTypesUser'

        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      EXEC sp_rename  'UserTypes','Privileges'
      EXEC sp_rename  'UserTypesPrivileges','UserProjectPrivileges'
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
