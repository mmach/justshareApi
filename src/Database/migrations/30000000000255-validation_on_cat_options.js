



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE CategoryOptionsTemplates
        ADD is_default_value bit

        ALTER TABLE CategoryOptionsTemplates
        ADD default_value nvarchar(500)

        ALTER TABLE CategoryOptionsTemplates
        ADD input_format nvarchar(500)

        ALTER TABLE CategoryOptionsTemplates
        ADD is_required bit
      
        ALTER TABLE CategoryOptionsTemplates
          ADD is_required_message nvarchar(500)
        
        ALTER TABLE CategoryOptionsTemplates
        ADD min int
        
        ALTER TABLE CategoryOptionsTemplates
        ADD min_dim_id_ref int

        ALTER TABLE CategoryOptionsTemplates
        ADD min_message nvarchar(500)
      
        ALTER TABLE CategoryOptionsTemplates
        ADD max int

        ALTER TABLE CategoryOptionsTemplates
        ADD max_dim_id_ref int

        ALTER TABLE CategoryOptionsTemplates
        ADD max_message nvarchar(500)

        ALTER TABLE CategoryOptionsTemplates
        ADD max_length int
        
        ALTER TABLE CategoryOptionsTemplates
        ADD max_length_message nvarchar(500)
                  
        ALTER TABLE CategoryOptionsTemplates
        ADD min_length int
        
        ALTER TABLE CategoryOptionsTemplates
        ADD min_length_message nvarchar(500)
       
        ALTER TABLE CategoryOptionsTemplates
        ADD pattern nvarchar(500)
        
        ALTER TABLE CategoryOptionsTemplates
        ADD pattern_message nvarchar(500)
       `

      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN is_default_value 

        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN default_value 

        ALTER TABLE CategoryOptionsTemplates
          DROP COLUMN is_required_message 
        
        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN min 
        
        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN min 

        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN min_dim_id_ref 

        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN max_dim_id_ref 
        
        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN min_message 
      
        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN max 
        
        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN max_message 

        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN max_length 
        
        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN max_length_message 
                  
        
        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN min_length 
        
        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN min_length_message 

        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN pattern 
        
        ALTER TABLE CategoryOptionsTemplates
        DROP COLUMN pattern_message 
        `
      )
  }
};







