"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class CmsPageProjects extends Model {
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
        title: {
          type: DataTypes.STRING
        },
        url: {
          type: DataTypes.BOOLEAN
        },
        project_id: {
          type: DataTypes.UUID,
        },
        is_active: {
          type: DataTypes.BOOLEAN
        },
        is_active: {
          type: DataTypes.BOOLEAN
        },
        url_exact: {
          type: DataTypes.BOOLEAN
        },
        cms: {
          type: DataTypes.STRING
        },
        layout_plugin_name: {
          type: DataTypes.STRING
        },
        is_homepage: {
          type: DataTypes.BOOLEAN
        },
      },
      {
        sequelize,
        tableName: 'CmsPageProjects'
      }
    );
  }
  static associate(models) {

  }
 
}
