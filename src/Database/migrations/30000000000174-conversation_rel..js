
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[Conversations]  WITH CHECK ADD  CONSTRAINT [FK_conversation_user] FOREIGN KEY([user_owner_id])  REFERENCES [dbo].[Users] ([id])

        ALTER TABLE [dbo].[Conversations]  WITH CHECK ADD  CONSTRAINT [FK_conversation_ItemUserActions] FOREIGN KEY([iua_id])       REFERENCES [dbo].[ItemUserActions] ([id])


        ALTER TABLE Conversations
        ADD  project_id char(36)  

        ALTER TABLE Conversations
        ADD  status varchar(3)      
                
        ALTER TABLE ConversationMessages
        ADD  project_id char(36)      
              
        ALTER TABLE UserConversations
        ADD project_id char(36) 

        ALTER TABLE [dbo].[Conversations]  WITH CHECK ADD  CONSTRAINT [FK_conversationProjects] FOREIGN KEY([project_id])       REFERENCES [dbo].[Projects] ([id])
        ALTER TABLE [dbo].[ConversationMessages]  WITH CHECK ADD  CONSTRAINT [FK_ConversationMessages_Projects] FOREIGN KEY([project_id])       REFERENCES [dbo].[Projects] ([id])
        ALTER TABLE [dbo].[UserConversations]  WITH CHECK ADD  CONSTRAINT [FK_UserConversations_Projects] FOREIGN KEY([project_id])       REFERENCES [dbo].[Projects] ([id])

        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[Conversations]  DROP   CONSTRAINT [FK_conversation_user]

      ALTER TABLE [dbo].[Conversations] DROP CONSTRAINT [FK_conversation_ItemUserActions] 



      ALTER TABLE [dbo].[Conversations]   DROP CONSTRAINT [FK_conversationProjects] 
      ALTER TABLE [dbo].[ConversationMessages]  DROP CONSTRAINT[FK_ConversationMessages_Projects]
      ALTER TABLE [dbo].[UserConversations]  DROP CONSTRAINT [FK_UserConversations_Projects]

      ALTER TABLE Conversations
      DROP COLUMN  status     
              
      ALTER TABLE Conversations
      DROP COLUMN  project_id      
            
      ALTER TABLE ConversationMessages
      DROP COLUMN  project_id       
            
      ALTER TABLE UserConversations
      DROP COLUMN project_id    
 `
      )
  }
};







