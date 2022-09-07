



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE CategoryOptions
        ADD is_required bit
      
        ALTER TABLE CategoryOptions
          ADD is_required_message nvarchar(500)
        
        ALTER TABLE CategoryOptions
        ADD min_selected int
        
        ALTER TABLE CategoryOptions
        ADD min_selected_dim_id_ref int

        ALTER TABLE CategoryOptions
        ADD min_selected_message nvarchar(500)
      
        ALTER TABLE CategoryOptions
        ADD max_selected int

        ALTER TABLE CategoryOptions
        ADD max_selected_dim_id_ref int

        ALTER TABLE CategoryOptions
        ADD max_selected_message nvarchar(500)

       `

      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE CategoryOptions
      DROP COLUMN is_required 

      ALTER TABLE CategoryOptions
      DROP COLUMN is_required_message 
      
      ALTER TABLE CategoryOptions
      DROP COLUMN min_selected 
      
      ALTER TABLE CategoryOptions
      DROP COLUMN min_selected_dim_id_ref 

      ALTER TABLE CategoryOptions
      DROP COLUMN min_selected_message 
    
      ALTER TABLE CategoryOptions
      DROP COLUMN max_selected 

      ALTER TABLE CategoryOptions
      DROP COLUMN max_selected_dim_id_ref 

      ALTER TABLE CategoryOptions
      DROP COLUMN max_selected_message

        `
      )
  }
};







