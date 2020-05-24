"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        EXEC sp_rename 'UserTypes', 'Roles'



       
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      EXEC sp_rename 'Roles','UserTypes'

     
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
