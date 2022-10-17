



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE CategoryOptions
        ADD  search_params nvarchar(max)
        
        ALTER TABLE CategoryOptions
        ADD  create_params nvarchar(max)   
        
        ALTER TABLE CategoryOptions
        ADD  preview_params nvarchar(max)   

      
        ALTER TABLE CategoryOptionsLinks
        ADD  search_params nvarchar(max) 
        
        ALTER TABLE CategoryOptionsLinks
        ADD  create_params nvarchar(max)
        
        ALTER TABLE CategoryOptionsLinks
        ADD  preview_params nvarchar(max)   

       `

      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE CategoryOptions
        DROP COLUMN  search_params 
        
      ALTER TABLE CategoryOptions
        DROP COLUMN  create_params
        
      ALTER TABLE CategoryOptions  
        DROP COLUMN  preview_params  

      ALTER TABLE CategoryOptionsLinks
        DROP COLUMN  search_params 
        
      ALTER TABLE CategoryOptionsLinks
        DROP COLUMN  create_params   
      
      ALTER TABLE CategoryOptionsLinks
        DROP COLUMN  preview_params  
        `
      )
  }
};







