
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE UserTypes
        ADD  
        [created_at] [datetimeoffset](7) 

        ALTER TABLE UserTypes
        ADD  
        [updated_at] [datetimeoffset](7) 

        ALTER TABLE UserTypeRoles
        ADD  
        [created_at] [datetimeoffset](7) 

        ALTER TABLE UserTypeRoles
        ADD  
        [updated_at] [datetimeoffset](7) 


        ALTER TABLE RolesProject
        ADD  
        [created_at] [datetimeoffset](7) 

        ALTER TABLE RolesProject
        ADD  
        [updated_at] [datetimeoffset](7) 

        ALTER TABLE PrivilegesProject
        ADD  
        [created_at] [datetimeoffset](7) 

        ALTER TABLE PrivilegesProject
        ADD  
        [updated_at] [datetimeoffset](7) 

        ALTER TABLE Privileges
        ADD  
        [created_at] [datetimeoffset](7) 

        ALTER TABLE Privileges
        ADD  
        [updated_at] [datetimeoffset](7) 
   
        ALTER TABLE LanguageProject
        ADD  
        [created_at] [datetimeoffset](7) 

        ALTER TABLE LanguageProject
        ADD  
        [updated_at] [datetimeoffset](7) 


        ALTER TABLE Language
        ADD  
        [created_at] [datetimeoffset](7) 

        ALTER TABLE Language
        ADD  
        [updated_at] [datetimeoffset](7) 


        ALTER TABLE ActionPrivileges
        ADD  
        [created_at] [datetimeoffset](7) 

        ALTER TABLE ActionPrivileges
        ADD  
        [updated_at] [datetimeoffset](7) 

        ALTER TABLE Actions
        ADD  
        [created_at] [datetimeoffset](7) 

        ALTER TABLE Actions
        ADD  
        [updated_at] [datetimeoffset](7)

        ALTER TABLE ActionsProject
        ADD  
        [created_at] [datetimeoffset](7) 

        ALTER TABLE ActionsProject
        ADD  
        [updated_at] [datetimeoffset](7)
           `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE ActionsProject DROP COLUMN created_at
      ALTER TABLE ActionsProject DROP COLUMN updated_at

      ALTER TABLE Actions DROP COLUMN created_at
      ALTER TABLE Actions DROP COLUMN updated_at
      
      ALTER TABLE ActionPrivileges DROP COLUMN created_at
      ALTER TABLE ActionPrivileges DROP COLUMN updated_at
      
      ALTER TABLE Language DROP COLUMN created_at
      ALTER TABLE Language DROP COLUMN updated_at
      
      ALTER TABLE LanguageProject DROP COLUMN created_at
      ALTER TABLE LanguageProject DROP COLUMN updated_at
      
      ALTER TABLE Privileges DROP COLUMN created_at
      ALTER TABLE Privileges DROP COLUMN updated_at
      
      ALTER TABLE PrivilegesProject DROP COLUMN created_at
      ALTER TABLE PrivilegesProject DROP COLUMN updated_at

      
      ALTER TABLE RolesProject DROP COLUMN created_at
      ALTER TABLE RolesProject DROP COLUMN updated_at

      
      ALTER TABLE UserTypeRoles DROP COLUMN created_at
      ALTER TABLE UserTypeRoles DROP COLUMN updated_at

      
      ALTER TABLE UserTypes DROP COLUMN created_at
      ALTER TABLE UserTypes DROP COLUMN updated_at
     
 `
      )
  }
};







