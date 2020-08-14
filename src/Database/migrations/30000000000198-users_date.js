

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
    
        CREATE TABLE [dbo].UserInvoicesValues(
          [id] [char](36) PRIMARY KEY,
          name nvarchar(500),
          address nvarchar(500),
          tax_number nvarchar(500),
          country nvarchar(500),
          city nvarchar(500),
          zip_code nvarchar(500),
          user_name nvarchar(200),
          bank_account_nr nvarchar(500),
          [created_at] [datetimeoffset](7) NOT NULL,
          [updated_at] [datetimeoffset](7) NOT NULL,
          project_id char(36)

        ) ON [PRIMARY] 

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
        DROP TABLE [dbo].UsersInvoicesValues
        `
      )
  }
};







