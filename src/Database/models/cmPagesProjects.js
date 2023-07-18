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
        translation_id: {
          type: DataTypes.UUID
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
    CmsPageProjects.belongsTo(models.Translations, { as: "translation", targetKey: 'id', foreignKey: "translation_id" });
  }
 

  static hooks(models, sequelize) {

    CmsPageProjects.beforeDestroy(async (item, options) => {

      console.log('beforeDestroy')

      await models.Translations.destroy({
        where: { id: item.translation_id },
        transaction: options.transaction,
        individualHooks: true
      })
    })
  }

}
