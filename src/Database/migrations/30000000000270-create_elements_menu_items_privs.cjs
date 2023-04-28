



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        CREATE TABLE [dbo].CmsMenuItemsPrivilegesProjects(
          [id] [char](36) PRIMARY KEY,
          [privilege_id] char(36),
          [cms_menu_item_id] [char](36),
          [project_id] char(36),
          [status] [char](36),
          [updated_at] [datetimeoffset](7) NULL,
          [created_at] [datetimeoffset](7) NULL  ) ON [PRIMARY] 
       `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
          DROP TABLE [dbo].CmsMenuItemsPrivilegesProjects
        `
      )
  }
};




