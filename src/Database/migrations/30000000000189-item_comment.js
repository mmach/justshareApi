

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
    
        CREATE TABLE [dbo].Comments(
          [id] [char](36) PRIMARY KEY,
          user_src_id char(36),
          user_id char(36),
          iua_id char(36),
          item_id char(36),
          comment nvarchar(max),
          rate  int,
          project_id char(36),
          action_id char(36),
          status char(1),
          [created_at] [datetimeoffset](7) NOT NULL,
          [updated_at] [datetimeoffset](7) NOT NULL
        ) ON [PRIMARY] 

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      DROP TABLE [dbo].[Comments]
      


        
    
        `
      )
  }
};







