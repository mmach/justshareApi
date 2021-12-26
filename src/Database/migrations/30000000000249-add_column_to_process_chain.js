



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `

        ALTER TABLE [dbo].[ProcessChains] 
        ADD invoke_only bit default 0
        
        ALTER TABLE [dbo].[ProcessChains] 
        ADD is_condition bit default 0
        
        `

      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
     
      

        `
      )
  }
};







