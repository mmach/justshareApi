



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[ProcessChains] DROP CONSTRAINT [FK_ProcessChains_VIEW_ActionsProjects]

      ALTER TABLE [ProcessChains]
        DROP COLUMN  action_view_id




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







