

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
    
        CREATE TABLE [dbo].InvoicesItems(
          [id] [char](36) PRIMARY KEY,
          price_net float,
          price float,
          price_tax float,
          tax float,
          amount float,
          currency nvarchaR(80),
          title nvarchar(200),
          project_id char(36),
          invoice_id char(36),
          [created_at] [datetimeoffset](7) NOT NULL,
          [updated_at] [datetimeoffset](7) NOT NULL
        ) ON [PRIMARY] 

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
          
        DROP TABLE [dbo].InvoicesItems
    
        `
      )
  }
};







