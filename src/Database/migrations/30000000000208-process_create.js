

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

        CREATE TABLE [dbo].Processes(
          [id] [char](36) PRIMARY KEY,
          [token] nvarchar(100),
          project_id char(36),
          [created_at] [datetimeoffset](7) NOT NULL,
          [updated_at] [datetimeoffset](7) NOT NULL
        ) ON [PRIMARY] 
  
        
    
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      DROP TABLE Processes
      

           `
      )
  }
};







