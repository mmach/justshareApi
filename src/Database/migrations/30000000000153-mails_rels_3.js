"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[MailSenders]  WITH CHECK ADD  CONSTRAINT [FK_MailSenders_Projects] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id])
        ALTER TABLE [dbo].[MailSenders]  WITH CHECK ADD  CONSTRAINT [FK_MailSenders_Translations] FOREIGN KEY([translation_id])
        REFERENCES [dbo].[Translations] ([id])
        



        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[MailSenders]  DROP  CONSTRAINT [FK_MailSenders_Projects] 

      ALTER TABLE [dbo].[MailSenders]  DROP  CONSTRAINT [FK_MailSenders_Translations] 


      `
      )
  }
};
