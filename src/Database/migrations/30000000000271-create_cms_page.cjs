



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        CREATE TABLE [dbo].CmsPageProjects(
          [id] [char](36) PRIMARY KEY,
          [title] nvarchar(200),
          [url]  varchar(200) ,
          [url_exact]  bit ,
          [cms] varchar(max),
          [is_active] bit,
          [layout_plugin_name] nvarchar(200),
          [translation_id] char(36),
          [is_homepage] nvarchar(200),
          [project_id] [char](36),
          [updated_at] [datetimeoffset](7) NULL,
          [created_at] [datetimeoffset](7) NULL  ) ON [PRIMARY] 
       `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
          DROP TABLE [dbo].CmsPageProjects
        `
      )
  }
};




