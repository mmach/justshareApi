

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
      
     ALTER TABLE ProcessChains
     ADD action_view_id char(36)

     ALTER TABLE ProcessChains
     ADD popup_type nvarchar(10)

     ALTER TABLE ProcessChains
     ADD has_reminder bit

     ALTER TABLE ProcessChains  WITH CHECK ADD  CONSTRAINT [FK_ProcessChains_VIEW_ActionsProjects] FOREIGN KEY([action_view_id])  REFERENCES [dbo].[ActionsProjects] ([id]) 
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE ProcessChains
      DROP COLUMN action_view_id
 
      ALTER TABLE ProcessChains
      DROP COLUMN popup_type
 
 
      ALTER TABLE ProcessChains
      DROP COLUMN has_reminder
   
           `
      )
  }
};







