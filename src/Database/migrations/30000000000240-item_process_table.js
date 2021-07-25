



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        CREATE TABLE [dbo].ItemProcessStates(
          [id] [char](36) PRIMARY KEY,
          [item_id] char(100),
          project_id char(36),
          process_id char(36),
          process_chain_id char(36),
          user_id char(36),
          step_order  int,
          [created_at] [datetimeoffset](7) NOT NULL,
          [updated_at] [datetimeoffset](7) NOT NULL
        ) ON [PRIMARY] 
  




      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      DROP TABLE [dbo].ItemProcessStates
           `
      )
  }
};







