
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].CmsPageProjects
          ADD  [func] nvarchar(200)
           
       `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].CmsPageProjects
      DROP  COLUMN [func]    `
      )
  }
};




