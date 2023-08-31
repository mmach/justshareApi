



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].CmsMenuItemsProjects
          ADD  [is_expanded] [bit]
           
       `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].CmsMenuItemsProjects
      DROP  COLUMN [is_expanded]    `
      )
  }
};




