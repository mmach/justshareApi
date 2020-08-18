"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        CREATE TABLE EsItemSyncs
 (
	id char(36),
  item_id char(36),
  project_id char(36),
	operation char(1),
  created_at datetimeoffset(7),
  updated_at datetimeoffset(7)
 )
        
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
     DROP TABLE EsItemSyncs`
      )
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
