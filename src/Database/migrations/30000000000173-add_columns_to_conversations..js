
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[Conversations] DROP CONSTRAINT [FK_conversation_user]

        ALTER TABLE Conversations
        DROP COLUMN ownerUser_id      
              
        ALTER TABLE Conversations
        ADD  user_owner_id char(36)      
              
        ALTER TABLE Conversations
        ADD iua_id char(36)      
       
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE Conversations
      ADD ownerUser_id char(36)      

      ALTER TABLE [dbo].[Conversations]  WITH CHECK ADD  CONSTRAINT [FK_conversation_user] FOREIGN KEY([ownerUser_id])
      REFERENCES [dbo].[Users] ([id])
      
      ALTER TABLE Conversations
      DROP COLUMN  user_owner_id      
            
      ALTER TABLE Conversations
      DROP COLUMN iua_id      
 `
      )
  }
};







