

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
    
      
        ALTER TABLE [dbo].[Invoices]  WITH CHECK ADD  CONSTRAINT [FK_Invoices_Users] FOREIGN KEY([invoice_user_dest_id])  REFERENCES [dbo].[InvoicesUsers] ([id])
        ALTER TABLE [dbo].[Invoices]  WITH CHECK ADD  CONSTRAINT [FK_Invoices_Users_SRC] FOREIGN KEY([invoice_user_src_id])  REFERENCES [dbo].[InvoicesUsers] ([id])
        ALTER TABLE [dbo].[Invoices]  WITH CHECK ADD  CONSTRAINT [FK_Invoices_ItemUserActions] FOREIGN KEY([iua_id])  REFERENCES [dbo].[ItemUserActions] ([id])
        ALTER TABLE [dbo].[Invoices]  WITH CHECK ADD  CONSTRAINT [FK_Invoices_Project] FOREIGN KEY([project_id])  REFERENCES [dbo].[Projects] ([id])
        ALTER TABLE [dbo].[Invoices]  WITH CHECK ADD  CONSTRAINT [FK_Invoices_ActionsProjects] FOREIGN KEY([action_id])  REFERENCES [dbo].[ActionsProjects] ([id])
        ALTER TABLE [dbo].[Invoices]  WITH CHECK ADD  CONSTRAINT [FK_Invoices_Blobs] FOREIGN KEY([blob_id])  REFERENCES [dbo].[Blobs] ([id])


      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
          
      ALTER TABLE [dbo].[Invoices]  DROP  CONSTRAINT [FK_Invoices_Users] 
      ALTER TABLE [dbo].[Invoices]  DROP  CONSTRAINT [FK_Invoices_Users_SRC] 
      ALTER TABLE [dbo].[Invoices]  DROP  CONSTRAINT [FK_Invoices_ItemUserActions] 
      ALTER TABLE [dbo].[Invoices]  DROP  CONSTRAINT [FK_Invoices_Project] 
      ALTER TABLE [dbo].[Invoices]  DROP  CONSTRAINT [FK_Invoices_ActionsProjects] 
      ALTER TABLE [dbo].[Invoices]  DROP  CONSTRAINT [FK_Invoices_Blobs] 
  
        `
      )
  }
};







