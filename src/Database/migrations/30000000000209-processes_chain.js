

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

        CREATE TABLE [dbo].ProcessChains(
          [id] [char](36) PRIMARY KEY,
          status_id char(36),
          action_id char(36),
          project_id char(36),
          process_id char(36),
          is_reminder bit,
          x float,
          y float,
          in_days int,
          [created_at] [datetimeoffset](7) NOT NULL,
          [updated_at] [datetimeoffset](7) NOT NULL
        ) ON [PRIMARY] 
  
        
    
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      DROP TABLE ProcessChains
      

           `
      )
  }
};







