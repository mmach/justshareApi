"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE CategoryOptions
        ADD search_label nvarchar(1000) NULL

        ALTER TABLE CategoryOptions
        ADD search_type nvarchar(100) NULL

        ALTER TABLE CategoryOptions
        ADD show_value nvarchar(1000) NULL

        ALTER TABLE CategoryOptions
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

      ALTER TABLE CategoryOptions
      DROP COLUMN search_label 

      ALTER TABLE CategoryOptions
      DROP COLUMN  search_type

      ALTER TABLE CategoryOptions
      DROP COLUMN  show_value

  

      ALTER TABLE CategoryOptions
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
