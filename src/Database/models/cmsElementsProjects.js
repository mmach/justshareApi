'use strict';

import { Model } from "sequelize";
/**
 *
 * @export
 * @class Users
 * @extends Sequelize.Model
 */
export default class CmsElementsProject extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {Language|Model}
   * @memberof Language
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: sequelize.UUIDV4

        },
        cms: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        load_on_init: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        token: {
          type: DataTypes.STRING,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        cms_element_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        is_active:  {
          type: DataTypes.BOOLEAN,
          allowNull: true
        }, 
      },
      { sequelize }
    );
  }
  static hooks(models, sequelize) {

    CmsElementsProject.beforeDestroy(async (item, options) => {

      await models.CmsElementsProjects.destroy({
        where: { cms_element_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      })
    })
  }
  static associate(models) {
    CmsElementsProject.belongsTo(models.CmsElementsProject, { as: "cms_element", targetKey: 'id', foreignKey: "cms_element_id" });

    // Users.hasOne(models.Blob, { as: "blob_profile", targetKey: 'id', foreignKey: "blob_id" });


    // Users.hasMany(models.UserAuth)
  }
}
