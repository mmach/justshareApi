"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE Categories
        ADD  blob_id char(36) NULL

        ALTER TABLE Blobs
        ADD  category_id char(36) NULL
      
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

     
      ALTER TABLE Categories
      DROP COLUMN  blob_id 

      ALTER TABLE Blobs
      DROP COLUMN    category_id 

    
      
`)
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
