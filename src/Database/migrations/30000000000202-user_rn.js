

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
    

        EXEC sp_rename 'UserInvoicesValues', 'UserInvoiceValues'
  
        EXEC sp_rename 'InvoicesItems', 'InvoiceItems'
        EXEC sp_rename 'InvoicesUsers', 'InvoiceUsers'


      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      EXEC sp_rename 'UserInvoiceValues', 'UserInvoicesValues'
  
      EXEC sp_rename 'InvoiceItems', 'InvoicesItems'
      EXEC sp_rename 'InvoiceUsers', 'InvoicesItems'
           `
      )
  }
};







