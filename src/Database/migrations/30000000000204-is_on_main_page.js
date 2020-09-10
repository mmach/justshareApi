

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

        ALTER TABLE Categories
        ADD  is_root bit 
  
        
        ALTER TABLE CategoryOptions
        ADD  is_on_main_page bit 
  
        ALTER TABLE CategoryOptionsLinks
        ADD  is_on_main_page bit 
  
        ALTER TABLE CategoryOptionsLinks
        ADD  order_search int 

    
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE Categories
      DROP COLUMN  is_root 

      
      ALTER TABLE CategoryOptions
      DROP COLUMN  is_on_main_page 

      ALTER TABLE CategoryOptionsLinks
      DROP COLUMN  is_on_main_page 
      
      ALTER TABLE CategoryOptionsLinks
      DROP COLUMN  order_search 

           `
      )
  }
};







