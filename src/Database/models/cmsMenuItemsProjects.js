"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class CmsMenuItemsProjects extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {CmsMenuItemsProjects|Model}
   * @memberof CmsMenuItemsProjects
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
        cms_menu_item_parent_id: {
          type: DataTypes.UUID,
        },
        cms_menu_id: {
          type: DataTypes.UUID,
        },
        translation_id: {
          type: DataTypes.UUID,
        },
        url: {
          type: DataTypes.STRING
        },
        icon: {
          type: DataTypes.STRING
        },
        func: {
          type: DataTypes.STRING
        },
        plugin_name: {
          type: DataTypes.STRING
        },
        project_id: {
          type: DataTypes.UUID,
        },
        is_active: {
          type: DataTypes.BOOLEAN
        },
        sort_order: {
          type: DataTypes.INTEGER
        },
      },
      {
        sequelize,
        tableName: 'CmsMenuItemsProjects'
      }
    );
  }
  static associate(models) {
    CmsMenuItemsProjects.hasMany(models.CmsMenuItemsPrivilegesProjects, { as: "menu_item_privileges", targetKey: 'id', foreignKey: "cms_menu_item_id" });
    CmsMenuItemsProjects.belongsTo(models.Translations, { as: "translation", targetKey: 'id', foreignKey: "translation_id" });
  }
  static hooks(models, sequelize) {


    CmsMenuItemsProjects.beforeDestroy(async (item, options) => {

      console.log('beforeDestroy')

      await models.CmsMenuItemsPrivilegesProjects.destroy({
        where: { cms_menu_item_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      })
      await models.CmsMenuItemsProjects.destroy({
        where: { cms_menu_item_parent_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      })

      await models.Translations.destroy({
        where: { id: item.translation_id },
        transaction: options.transaction,
        individualHooks: true
      })
    })
  }
}
