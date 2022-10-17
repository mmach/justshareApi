



"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE [dbo].[Tags] DROP CONSTRAINT [IX_Tags]
        
        
  
        
        ALTER TABLE [dbo].[Tags] ADD  CONSTRAINT [IX_Tags] UNIQUE NONCLUSTERED 
        (
          [tag] ASC,
          [project_id] ASC
        )WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
        
        
        
        
       
       `

      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[Tags] DROP CONSTRAINT [IX_Tags]
        
        
  
        
      ALTER TABLE [dbo].[Tags] ADD  CONSTRAINT [IX_Tags] UNIQUE NONCLUSTERED 
      (
        [tag] ASC,
      )WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
      
        `
      )
  }
};







