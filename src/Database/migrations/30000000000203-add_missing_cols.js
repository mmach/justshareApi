

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

        ALTER TABLE CategoryOptionsLinks
        ADD  is_on_iua bit 
  
        
        ALTER TABLE CategoryOptions
        ADD  is_on_iua bit 
  
        ALTER TABLE CategoryOptionsLinks
        ADD  is_on_iua_request bit 
  
        
        ALTER TABLE CategoryOptions
        ADD  is_on_iua_request bit 
        
        ALTER TABLE CategoryOptionsLinks
        ADD  is_params bit 
  
        
        ALTER TABLE CategoryOptions
        ADD  is_params bit 
  
        ALTER TABLE ItemUserActions
        ADD  created_date datetimeoffset(7) 

    
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE CategoryOptionsLinks
      DROP COLUMN is_on_iua 

      
      ALTER TABLE CategoryOptions
      DROP COLUMN is_on_iua 

      ALTER TABLE CategoryOptionsLinks
      DROP COLUMN is_on_iua_request 

      
      ALTER TABLE CategoryOptions
      DROP COLUMN is_on_iua_request 
      
      ALTER TABLE CategoryOptionsLinks
      DROP COLUMN is_params 

      
      ALTER TABLE CategoryOptions
      DROP COLUMN is_params 

      ALTER TABLE ItemUserActions
      DROP COLUMN created_date 


           `
      )
  }
};







