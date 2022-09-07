



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE CategoryOptions
        ADD  is_form_rendered bit
  
        ALTER TABLE CategoryOptionsLinks
        ADD  is_form_rendered bit 
        
       
       `

      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

        ALTER TABLE CategoryOptions
        DROP COLUMN is_form_rendered 

        ALTER TABLE CategoryOptionsLinks
        DROP COLUMN  is_form_rendered
        `
      )
  }
};







