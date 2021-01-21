

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
      
 
       
    ALTER TABLE [dbo].[Categories]
    ADD process_id char(36),
    params nvarchar(max),
    preview_desktop nvarchar(255),
    preview_mobile nvarchar(255)


      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[Categories]
      DROP COLUMN process_id,
      COLUMN params ,
      COLUMN preview_desktop ,
      COLUMN preview_mobile 

   
           `
      )
  }
};







