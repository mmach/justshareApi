



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        CREATE TABLE [dbo].CmsMenuItemsProjects(
          [id] [char](36) PRIMARY KEY,
          [cms_menu_item_parent_id] char(36),
          [cms_menu_id] [char](36),
          [translation_id] [char](36),
          [url]  nvarchar(max),
          [icon] nvarchar(max),
          [func] nvarchar(max),
          [pluginName] nvarchar(max),
          [project_id] char(36),
          [is_active] bit,
          [updated_at] [datetimeoffset](7) NULL,
          [created_at] [datetimeoffset](7) NULL  ) ON [PRIMARY] 
       `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
          DROP TABLE [dbo].CmsMenuItemsProjects
        `
      )
  }
};







