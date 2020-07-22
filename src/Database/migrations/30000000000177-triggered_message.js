
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
      

        ALTER   TABLE [dbo].[ConversationMessages] 
        ADD message_triggered_id char(36);

        ALTER   TABLE [dbo].[ConversationMessages] 
        ADD is_newest bit;

        ALTER TABLE [dbo].[ConversationMessages]  WITH CHECK ADD  CONSTRAINT [FK_ConversationMessages_ConversationMessages] FOREIGN KEY([message_triggered_id])       REFERENCES [dbo].[ConversationMessages] ([id])
       
        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[ConversationMessages]  DROP  CONSTRAINT [FK_ConversationMessages_ConversationMessages]
      
      ALTER   TABLE [dbo].[ConversationMessages]
        DROP COLUMN message_triggered_id

        ALTER   TABLE [dbo].[ConversationMessages] 
        DROP COLUMN is_newest;

 `
      )
  }
};







