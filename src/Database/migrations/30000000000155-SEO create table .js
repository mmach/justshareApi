"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `
       CREATE TABLE Seos
       (
        id char(36) PRIMARY KEY,
        project_id char(36),
        fb_app_id nvarchar(1000),
        fb_type nvarchar(1000),
        fb_title nvarchar(1000),
        fb_image nvarchar(1000),
        fb_description nvarchar(1000),
        fb_site_name nvarchar(1000),
        fb_url nvarchar(1000),

        sitemap_gen bit,
        sitemap_add_json nvarchar(max),
        [created_at] [datetimeoffset](7) NULL,
         [updated_at] [datetimeoffset](7) NULL
              ) ON [PRIMARY]   


        `


      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      DROP TABLE Seos

      `
      )
  }
};
