"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
       ALTER TABLE Translations
       ADD  token nvarchar(500)

       ALTER TABLE Translations
       ADD  respStatus int

       ALTER TABLE Translations
       ADD  type nvarchar(500)

       ALTER TABLE Translations
       ADD  version nvarchar(500)
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE Translations
      DROP COLUMN  token

      ALTER TABLE Translations
      DROP COLUMN  respStatus 

      ALTER TABLE Translations
      DROP COLUMN  type 
      
      ALTER TABLE Translations
      DROP COLUMN version 
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


