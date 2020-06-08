"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[Seos]  WITH CHECK ADD  CONSTRAINT [FK_Seos_Projects] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id])



        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[Seos]  DROP  CONSTRAINT [FK_Seos_Projects] 
      `
      )
  }
};
