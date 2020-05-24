"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
       CREATE TABLE LanguageProject(
       id char(36) PRIMARY KEY,
       language_id char(36),
       project_id char(36),
       status bit
        
     ) ON [PRIMARY]   

        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      DROP TABLE LanguageProject
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
