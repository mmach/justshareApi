"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        CREATE TABLE UserRoles(
          id char(36) PRIMARY KEY,
          name nvarchar(150) ,
          role_id char(36),
          project_id char(36),
          user_id char(36)
          [created_at] [datetimeoffset](7) NULL,
          [updated_at] [datetimeoffset](7) NULL
               ) ON [PRIMARY]   
   
           `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
  
    DROP TABLE UserRoles

     
 `
      )
  }
};



