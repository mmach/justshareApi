
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
           ALTER TABLE [dbo].[ConversationMessageMembers]  WITH CHECK ADD  CONSTRAINT [FK_ConversationMessageMembers_Projects] FOREIGN KEY([project_id])
     REFERENCES [dbo].[Projects] ([id])
       
     ALTER TABLE [dbo].[ConversationMessageMembers]  WITH CHECK ADD  CONSTRAINT [FK_ConversationMessageMembers_Conversaion] FOREIGN KEY([conversation_id])
     REFERENCES [dbo].[Conversations] ([id])
     
     ALTER TABLE [dbo].[ConversationMessageMembers]  WITH CHECK ADD  CONSTRAINT [FK_ConversationMessageMembers_ConversationMessages] FOREIGN KEY([message_id])
     REFERENCES [dbo].[ConversationMessages] ([id])
     
     ALTER TABLE [dbo].[ConversationMessageMembers]  WITH CHECK ADD  CONSTRAINT [FK_ConversationMessageMembers_Users] FOREIGN KEY([user_id])
     REFERENCES [dbo].[Users] ([id])
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[ConversationMessageMembers]  DROP CONSTRAINT [FK_ConversationMessageMembers_Projects] 
        
      ALTER TABLE [dbo].[ConversationMessageMembers]  DROP CONSTRAINT [FK_ConversationMessageMembers_Conversaion] 
      
      ALTER TABLE [dbo].[ConversationMessageMembers] DROP CONSTRAINT [FK_ConversationMessageMembers_ConversationMessages] 
      
      ALTER TABLE [dbo].[ConversationMessageMembers]  DROP CONSTRAINT [FK_ConversationMessageMembers_Users] 
      `
      )
  }
};







