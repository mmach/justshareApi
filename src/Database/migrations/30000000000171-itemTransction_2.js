"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
     
CREATE TABLE [dbo].[ItemTransactionCategoryOptions](
	[id] [char](36) NOT NULL,
	[ico_id] [char](36) NULL,
	[item_id] [char](36) NULL,
	[itemTransaction_id] [char](36) NULL,
	[co_temp_id] [char](36) NOT NULL,
	[updated_at] [datetimeoffset](7) NULL,
	[created_at] [datetimeoffset](7) NULL,
	[col_id] [char](36) NULL,
	[value] [nvarchar](500) NULL,
	[status] [char](3) NULL,
	[iua_id] [char](36) NULL,
	[dim_id] [char](36) NULL,
	[project_id] [char](36) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[ItemTransactionCategoryOptions]  WITH CHECK ADD  CONSTRAINT [FK_ITCO_COL] FOREIGN KEY([col_id])
REFERENCES [dbo].[CategoryOptionsLinks] ([id])

ALTER TABLE [dbo].[ItemTransactionCategoryOptions] CHECK CONSTRAINT [FK_ITCO_COL]

ALTER TABLE [dbo].[ItemTransactionCategoryOptions]  WITH CHECK ADD  CONSTRAINT [FK_ITCO_COT] FOREIGN KEY([co_temp_id])
REFERENCES [dbo].[CategoryOptionsTemplates] ([id])

ALTER TABLE [dbo].[ItemTransactionCategoryOptions] CHECK CONSTRAINT [FK_ITCO_COT]

ALTER TABLE [dbo].[ItemTransactionCategoryOptions]  WITH CHECK ADD  CONSTRAINT [FK_ITCO_IT] FOREIGN KEY([itemTransaction_id])
REFERENCES [dbo].[ItemTransactions] ([id])

ALTER TABLE [dbo].[ItemTransactionCategoryOptions] CHECK CONSTRAINT [FK_ITCO_IT]

ALTER TABLE [dbo].[ItemTransactionCategoryOptions]  WITH CHECK ADD  CONSTRAINT [FK_ItemTransactionCategoryOptions_DimensionsProjects] FOREIGN KEY([dim_id])
REFERENCES [dbo].[DimensionsProjects] ([id])

ALTER TABLE [dbo].[ItemTransactionCategoryOptions] CHECK CONSTRAINT [FK_ItemTransactionCategoryOptions_DimensionsProjects]

ALTER TABLE [dbo].[ItemTransactionCategoryOptions]  WITH CHECK ADD  CONSTRAINT [FK_ItemTransactionCategoryOptions_ItemUserAction] FOREIGN KEY([iua_id])
REFERENCES [dbo].[ItemUserActions] ([id])

ALTER TABLE [dbo].[ItemTransactionCategoryOptions] CHECK CONSTRAINT [FK_ItemTransactionCategoryOptions_ItemUserAction]

ALTER TABLE [dbo].[ItemTransactionCategoryOptions]  WITH CHECK ADD  CONSTRAINT [FK_ItemTransactionCategoryOptions_Projects] FOREIGN KEY([project_id])
REFERENCES [dbo].[Projects] ([id])

ALTER TABLE [dbo].[ItemTransactionCategoryOptions] CHECK CONSTRAINT [FK_ItemTransactionCategoryOptions_Projects]


        `
      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      DROP TABLE ItemTransactionCategoryOptions
             `
      )
  }
};
