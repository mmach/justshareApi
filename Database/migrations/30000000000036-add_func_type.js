"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE CategoryOptionsTypeTemplates
        ADD is_func bit NULL

        ALTER TABLE CategoryOptionsTemplates
        ADD func nvarchar(100) NULL


      
      
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

      ALTER TABLE CategoryOptionsTypeTemplates
      DROP COLUMN is_func 

      ALTER TABLE CategoryOptionsTemplates
      DROP COLUMN  func

  
      
`)
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
