"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE Items
        ADD expired_date datetime NULL

        


      
      
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

      ALTER TABLE Items
      DROP COLUMN expired_date 


  
      
`)
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
