"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        EXEC sp_rename 'UserTypesProject.translate_id', 'translation_id', 'COLUMN';
      
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      EXEC sp_rename 'UserTypesProject.translation_id', 'translate_id', 'COLUMN';

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
