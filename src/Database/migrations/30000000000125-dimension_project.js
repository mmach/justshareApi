"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
       CREATE TABLE DimensionsProjects(
       id char(36) PRIMARY KEY,
       dimension_id char(36),
       project_id char(36),
       translation_id char(36),
       created_at [datetimeoffset](7) ,
       updated_at [datetimeoffset](7) 
            ) ON [PRIMARY]  
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      DROP TABLE DimensionsProjects
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
