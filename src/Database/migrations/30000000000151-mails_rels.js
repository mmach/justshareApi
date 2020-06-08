"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[MailParts]  WITH CHECK ADD  CONSTRAINT [FK_MailParts_Projects] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id])



        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[MailParts]  DROP  CONSTRAINT [FK_MailParts_Projects] 
      `
      )
  }
};
