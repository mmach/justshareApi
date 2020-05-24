"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        EXEC sp_rename 'UserTypesUser.privilege_id', 'usertype_id', 'COLUMN';
      
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      EXEC sp_rename 'UserTypesUser.usertype_id', 'privilege_id', 'COLUMN';

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
