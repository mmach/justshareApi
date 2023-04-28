



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        CREATE TABLE [dbo].CmsMenuProjects(
          [id] [char](36) PRIMARY KEY,
          [token] nvarchar(max),
          [load_on_init]  bit ,
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
          DROP TABLE [dbo].CmsMenuProjects
        `
      )
  }
};







