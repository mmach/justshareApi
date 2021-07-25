



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

     

        
        CREATE TABLE [dbo].ProcessChainPrivileges(
          [id] [char](36) PRIMARY KEY,
          [process_chain_id] char(36),
          [process_chain_action_id] char(36),
          project_id char(36),
          privilege_id char(36),
          [created_at] [datetimeoffset](7) NOT NULL,
          [updated_at] [datetimeoffset](7) NOT NULL
        ) ON [PRIMARY] 



      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      DROP  TABLE [dbo].ProcessChainPrivileges
           `
      )
  }
};







