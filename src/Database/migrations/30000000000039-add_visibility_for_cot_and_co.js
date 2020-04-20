"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE CategoryOptionsLinks
        ADD  is_visible_view bit NULL

        ALTER TABLE CategoryOptions
        ADD is_visible_view bit NULL

        ALTER TABLE CategoryOptionsTemplates
        ADD is_visible_view bit NULL
      
        `
        /**
         * 
              ALTER TABLE CategoryOptions
              ADD is_func nvarchar(1000) NULL
      
              ALTER TABLE CategoryOptions
              ADD func nvarchar(1000) NULL
      
         */

      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

     
      ALTER TABLE CategoryOptionsLinks
      DROP COLUMN  is_visible_view

      ALTER TABLE CategoryOptions
      DROP COLUMN is_visible_view

      ALTER TABLE CategoryOptionsTemplates
      DROP COLUMN is_visible_view
      
`)
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
