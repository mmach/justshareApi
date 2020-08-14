"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        CREATE TABLE [dbo].[UserTypeRoles](
          [id] [char](36) NOT NULL,
          [name] [nvarchar](150) NULL,
          [role_id] [char](36) NULL,
          [usertype_id] [char](36) NULL,
          [project_id] [char](36) NULL,
          [created_at] [datetimeoffset](7) NULL,
          [updated_at] [datetimeoffset](7) NULL,
        PRIMARY KEY CLUSTERED 
        (
          [id] ASC
        )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
        ) ON [PRIMARY]
   
           `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
  
    DROP TABLE UserTypeRoles

     
 `
      )
  }
};



