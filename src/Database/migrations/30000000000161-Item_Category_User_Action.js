"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
        
    CREATE TABLE ItemUserAction  
    (
       id char(36) PRIMARY KEY,
       iua_id char(36),
       project_id char(36),
       item_id char(36),
       user_id char(36),
       action_id char(36),
       comment nvarchar(max),
       rating int,
       status char(3),   
       [created_at] [datetimeoffset](7) NULL,
        [updated_at] [datetimeoffset](7) NULL
             ) ON [PRIMARY]   
        
          
        `
      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      
      DROP TABLE ItemUserAction

      

             `
      )
  }
};
