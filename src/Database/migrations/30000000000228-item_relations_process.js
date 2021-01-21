

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[Items]
        ADD process_id char(36),
        process_chain_id char(36),
        process_updated_date [datetimeoffset](7)

    ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_Processes] FOREIGN KEY([process_id])  REFERENCES [dbo].[Processes] ([id])
    ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_ProcessChains] FOREIGN KEY([process_chain_id])  REFERENCES [dbo].[ProcessChains] ([id])


      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
    

      ALTER TABLE [dbo].[Items]  DROP  CONSTRAINT [FK_Items_Processes] 
      ALTER TABLE [dbo].[Items]  DROP CONSTRAINT [FK_Items_ProcessChains];
      
      ALTER TABLE [dbo].[Items]
      DROP COLUMN process_id ,
      COLUMN process_chain_id ,
      COLUMN process_updated_date ;
 
   
           `
      )
  }
};







