"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE Items
        ADD  external_id bit NULL

       
      
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
      DROP COLUMN  external_id 

      

    
      
`)
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
