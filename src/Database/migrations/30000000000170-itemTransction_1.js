"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
     
CREATE TABLE [dbo].ItemTransactions(
  [id] [char](36) PRIMARY KEY,
  item_id char(36) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[description] [nvarchar](max) NULL,
	[user_id] [char](36) NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
	[longitude] [float] NULL,
	[latitude] [float] NULL,
	[category_id] [char](36) NULL,
	[blob_id] [char](36) NULL,
	[category_type] [int] NULL,
	[status] [int] NULL,
	[expired_date] [datetime] NULL,
	[external_id] [bit] NULL,
  [project_id] [char](36) NULL,
  iua_id char(36) NULL
) ON [PRIMARY]   

ALTER TABLE [dbo].ItemTransactions  WITH CHECK ADD  CONSTRAINT [FK_ItemTransactions_Categories] FOREIGN KEY([category_id])
REFERENCES [dbo].[Categories] ([id])

ALTER TABLE [dbo].ItemTransactions CHECK CONSTRAINT [FK_ItemTransactions_Categories]

ALTER TABLE [dbo].ItemTransactions  WITH CHECK ADD  CONSTRAINT [FK_ItemTransactions_Project] FOREIGN KEY([project_id])
REFERENCES [dbo].[Projects] ([id])

ALTER TABLE [dbo].ItemTransactions CHECK CONSTRAINT [FK_ItemTransactions_Project]

ALTER TABLE [dbo].ItemTransactions  WITH CHECK ADD  CONSTRAINT [FK_user_id_ItemTransactions] FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([id])

ALTER TABLE [dbo].ItemTransactions CHECK CONSTRAINT [FK_user_id_ItemTransactions]

ALTER TABLE [dbo].ItemTransactions  WITH CHECK ADD  CONSTRAINT [FK_ItemUserAction_ItemTransactions] FOREIGN KEY([iua_id])
REFERENCES [dbo].[ItemUserAction] ([id])

ALTER TABLE [dbo].ItemTransactions CHECK CONSTRAINT [FK_ItemUserAction_ItemTransactions]



        `
      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      DROP TABLE ItemTransactions
             `
      )
  }
};
