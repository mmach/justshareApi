

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
    
        CREATE TABLE [dbo].Invoices(
          [id] [char](36) PRIMARY KEY,
          blob_id char(36),
          iua_id char(36),     
          price_net float,
          price float,
          price_tax float,
          tax float,
          dueDate [datetimeoffset](7) ,
          currency nvarchaR(80),
          title nvarchar(200),
          number int,
          number_string nvarchar(200) ,
          project_id char(36),
          status char(1),
          month int,
          year int,
          action_id char(36),
          invoice_user_src_id char(36),
          invoice_user_dest_id char(36),
          [created_at] [datetimeoffset](7) NOT NULL,
          [updated_at] [datetimeoffset](7) NOT NULL
        ) ON [PRIMARY] 

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
          
        DROP TABLE [dbo].Invoices
    
        `
      )
  }
};







