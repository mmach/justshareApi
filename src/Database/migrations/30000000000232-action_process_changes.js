

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
       ALTER TABLE Actions
        DROP COLUMN as_process;

      ALTER TABLE Actions
        DROP COLUMN is_process_invoker

      ALTER TABLE Actions
        ADD  project_id char(36)

      ALTER TABLE [dbo].[Actions]  WITH CHECK ADD  CONSTRAINT [FK_Actions_Project] FOREIGN KEY([project_id])  REFERENCES [dbo].[Projects] ([id])

      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
    
      ALTER TABLE Actions
        ADD  as_process bit; 

      ALTER TABLE Actions
        ADD is_process_invoker bit

      ALTER TABLE [dbo].[Actions]  DROP  CONSTRAINT [FK_Actions_Project] 
      
      ALTER TABLE Actions
        DROP COLUMN  project_id
   
           `
      )
  }
};







