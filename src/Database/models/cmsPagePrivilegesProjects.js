"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class CmsPagePrivilegesProjects extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {CmsPagePrivilegesProjects|Model}
   * @memberof CmsPagePrivilegesProjects
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
        privilege_id: {
          type: DataTypes.UUID,
        },
        cms_page_id: {
          type: DataTypes.UUID,
        },
        status: {
          type: DataTypes.UUID,
        },

        project_id: {
          type: DataTypes.UUID,
        },
      },
      {
        sequelize,
        tableName: 'CmsPagePrivilegesProjects'
      }
    );
  }
  static associate(models) {
    CmsPagePrivilegesProjects.belongsTo(models.PrivilegesProject, { as: "privileges", targetKey: 'id', foreignKey: "privilege_id" });

  }
}
