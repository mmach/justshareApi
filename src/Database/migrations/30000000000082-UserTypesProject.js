"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
       CREATE TABLE UserTypesProject(
       id char(36) PRIMARY KEY,
       usertype_id char(36),
       project_id char(36),
       translate_id char(36) 
            ) ON [PRIMARY]   

        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      DROP TABLE UserTypesProject
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
