"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[MailTypesProjects]  WITH CHECK ADD  CONSTRAINT [FK_MailTypesProjects_Projects] FOREIGN KEY([project_id])
        REFERENCES [dbo].[Projects] ([id])

        ALTER TABLE [dbo].[MailTypesProjects]  WITH CHECK ADD  CONSTRAINT [FK_MailTypesProjects_Translations] FOREIGN KEY([translation_id])
        REFERENCES [dbo].[Translations] ([id])

        ALTER TABLE [dbo].[MailTypesProjects]  WITH CHECK ADD  CONSTRAINT [FK_MailTypesProjects_MailSenders] FOREIGN KEY([mailsender_id])
        REFERENCES [dbo].[MailSenders] ([id])

        ALTER TABLE [dbo].[MailTypesProjects]  WITH CHECK ADD  CONSTRAINT [FK_MailTypesProjects_MailParts_body] FOREIGN KEY([mail_body_id])
        REFERENCES [dbo].[MailParts] ([id])

        ALTER TABLE [dbo].[MailTypesProjects]  WITH CHECK ADD  CONSTRAINT [FK_MailTypesProjects_MailParts_template] FOREIGN KEY([mail_template_id])
        REFERENCES [dbo].[MailParts] ([id])

        ALTER TABLE [dbo].[MailTypesProjects]  WITH CHECK ADD  CONSTRAINT [FK_MailTypesProjects_MailTypes] FOREIGN KEY([mailtype_id])
        REFERENCES [dbo].[MailTypes] ([id])


        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE [dbo].[MailTypesProjects]  DROP  CONSTRAINT [FK_MailTypesProjects_Projects] 

ALTER TABLE [dbo].[MailTypesProjects]  DROP  CONSTRAINT [FK_MailTypesProjects_Projects] 

      ALTER TABLE [dbo].[MailTypesProjects]  DROP  CONSTRAINT [FK_MailTypesProjects_MailSenders] 

      ALTER TABLE [dbo].[MailTypesProjects]  DROP  CONSTRAINT [FK_MailTypesProjects_MailParts_body] 

      ALTER TABLE [dbo].[MailTypesProjects]  DROP  CONSTRAINT [FK_MailTypesProjects_MailParts_template] 

      ALTER TABLE [dbo].[MailTypesProjects]  DROP  CONSTRAINT [FK_MailTypesProjects_MailTypes] 


      `
      )
  }
};
