"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        EXEC sp_rename 'CategoryActions.actions_project_id', 'action_id', 'COLUMN';
      
       
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      EXEC sp_rename 'CategoryActions.action_id', 'actions_project_id', 'COLUMN';
      
 

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
