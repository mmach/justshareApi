
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
      
  CREATE TABLE ConversationMessageMembers
  (

     id char(36) PRIMARY KEY,
     user_id char(36),
     conversation_id char(36),
     project_id char(36),
     message_id char(36),
     status char(1),
     [created_at] [datetimeoffset](7) NULL,
     [updated_at] [datetimeoffset](7) NULL         
     ) ON [PRIMARY]   
      
        
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
     DROP TABLE ConversationMessageMembers
 `
      )
  }
};







