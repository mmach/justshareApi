"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        EXEC sp_rename 'CategoryOptionsProject', 'CategoryOptionsProjects'
        EXEC sp_rename 'CategoryProject', 'CategoryProjects'

        `
      

      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      EXEC sp_rename 'CategoryOptionsProjects','CategoryOptionsProject'
      EXEC sp_rename 'CategoryProjects', 'CategoryProject'

      
`)
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
