



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        CREATE TABLE [dbo].ProcessChainActionInjections(
          [id] [char](36) PRIMARY KEY,
          [process_chain_id] char(36),
          action_id char(36),
          project_id char(36),
          action_type nvarchar(100),
          action_group nvarchar(100),
          func nvarchar(1000),
          [created_at] [datetimeoffset](7) NOT NULL,
          [updated_at] [datetimeoffset](7) NOT NULL
        ) ON [PRIMARY] 


      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      DROP TABLE ProcessChainActionInjections
      `
      )
  }
};







