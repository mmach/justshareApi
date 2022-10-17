



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        CREATE TABLE [dbo].CmsElementsProjects(
          [id] [char](36) PRIMARY KEY,
          [cms] nvarchar(max),
          [load_on_init]  bit ,
          [token] nvarchar(200) ,
          [project_id] char(36),
          [cms_element_id] char(36) NULL,
          [is_active] bit,
          [updated_at] [datetimeoffset](7) NULL,
          [created_at] [datetimeoffset](7) NULL  ) ON [PRIMARY] 
       `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
          DROP TABLE [dbo].CmsElementsProjects
        `
      )
  }
};







