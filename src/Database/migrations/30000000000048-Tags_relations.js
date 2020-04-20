"use strict";
module.exports = {
  up :(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `  
        ALTER TABLE [dbo].[ItemTags]  WITH CHECK ADD  CONSTRAINT [FK_Tags_Tag] FOREIGN KEY([tag_id])
        REFERENCES [dbo].[Tags] ([id])
        
        ALTER TABLE [dbo].[ItemTags]  WITH CHECK ADD  CONSTRAINT [FK_Tag_Item] FOREIGN KEY([item_id])
        REFERENCES [dbo].[Items] ([id])
        

        `

      )
  },
  down:(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            
    
      
      ALTER TABLE [dbo].[ItemTags] DROP CONSTRAINT [FK_Tag_Item]
      
      ALTER TABLE [dbo].[ItemTags] DROP CONSTRAINT [FK_Tags_Tag]
   
        
    `);
  }
};
