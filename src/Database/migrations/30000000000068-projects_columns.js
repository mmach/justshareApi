"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[Projects]
        ADD theme_color nvarchar(20)

        
        ALTER TABLE [dbo].[Projects]
          ADD root_category_id char(36)
        
        ALTER TABLE [dbo].[Projects]
            ADD item_to_parent bit

        ALTER TABLE [dbo].[Projects]
              ADD logo_url nvarchar(1000)
  
        ALTER TABLE [dbo].[Projects]
            ADD status int
    
        ALTER TABLE [dbo].[Projects]
              ADD base_url int
        
        ALTER TABLE [dbo].[Projects]
              ADD contact_mail nvarchar(100)
              
        ALTER TABLE [dbo].[Projects]  WITH CHECK ADD  CONSTRAINT [FK_Project_Categories] FOREIGN KEY([root_category_id])
        REFERENCES [dbo].[Categories] ([id])
        `
      

      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[Projects] DROP CONSTRAINT [FK_Project_Categories]  

      ALTER TABLE [dbo].[Projects]
      DROP COLUMN theme_color 

      
      ALTER TABLE [dbo].[Projects]
      DROP COLUMN root_category_id 
      
      ALTER TABLE [dbo].[Projects]
      DROP COLUMN item_to_parent 

      ALTER TABLE [dbo].[Projects]
      DROP COLUMN logo_url 

      ALTER TABLE [dbo].[Projects]
      DROP COLUMN status 
  
      ALTER TABLE [dbo].[Projects]
      DROP COLUMN base_url

      ALTER TABLE [dbo].[Projects]
      DROP COLUMN contact_mail
      
      
`)
  }
};

/**
 *      ALTER TABLE CategoryOptions
      DROP COLUMN is_func

      ALTER TABLE CategoryOptions
      DROP COLUMN  func
 */
