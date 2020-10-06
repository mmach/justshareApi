

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

    
        CREATE TABLE [dbo].ProcessChainStates(
          [id] [char](36) PRIMARY KEY,
          process_chain_id char(36),
          project_id char(36),
          process_id char(36),
          is_accept bit,
          [created_at] [datetimeoffset](7) NOT NULL,
          [updated_at] [datetimeoffset](7) NOT NULL
        ) ON [PRIMARY] 
      
  
        
    
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      DROP TABLE ProcessChainStates
      

           `
      )
  }
};







