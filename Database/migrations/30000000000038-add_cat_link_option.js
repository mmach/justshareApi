"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE CategoryOptionsLinks
        ADD search_label nvarchar(1000) NULL

        ALTER TABLE CategoryOptionsLinks
        ADD search_type nvarchar(100) NULL

        ALTER TABLE CategoryOptionsLinks
        ADD show_value nvarchar(1000) NULL

        ALTER TABLE CategoryOptionsLinks
        ADD can_above_pin bit NULL
      
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
      DROP COLUMN search_label 

      ALTER TABLE CategoryOptionsLinks
      DROP COLUMN  search_type

      ALTER TABLE CategoryOptionsLinks
      DROP COLUMN  show_value

  

      ALTER TABLE CategoryOptionsLinks
      DROP COLUMN can_above_pin 

      
`)
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
