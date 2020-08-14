
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        
CREATE TABLE [dbo].StatusProjects(
  [id] [char](36) PRIMARY KEY,
  is_closed bit,
  status_id char(36)  ,
  translation_id char(36),
  project_id char(36),
  status_order int,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL
) ON [PRIMARY]   

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
DROP TABLE StatusProjects
      `
      )
  }
};







