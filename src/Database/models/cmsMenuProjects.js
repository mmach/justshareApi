"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class CmsMenuProjects extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {CmsMenuProjects|Model}
   * @memberof CmsMenuProjects
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
        token: {
          type: DataTypes.STRING
        },
        load_on_init: {
          type: DataTypes.BOOLEAN
        },
        project_id: {
          type: DataTypes.UUID,
        },
        is_active: {
          type: DataTypes.BOOLEAN
        },
      },
      {
        sequelize,
        tableName: 'CmsMenuProjects'
      }
    );
  }
  static associate(models) {
    CmsMenuProjects.hasMany(models.CmsMenuItemsProjects, { as: "menu_items", targetKey: 'id', foreignKey: "cms_menu_id" });

  }
}
