
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        
CREATE TABLE [dbo].StatusActions(
  [id] [char](36) PRIMARY KEY,
  status_id char(36),
  action_id char(36),
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
) ON [PRIMARY]   

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
DROP TABLE StatusActions
      `
      )
  }
};







