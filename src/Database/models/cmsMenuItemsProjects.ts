'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for CmsMenuItemsProjects attributes
 */
export interface CmsMenuItemsProjectsDTO {
  id: string;
  cms_menu_item_parent_id?: string;
  cms_menu_id?: string;
  translation_id?: string;
  url?: string;
  icon?: string;
  is_expanded?: boolean;
  func?: string;
  plugin_name?: string;
  project_id?: string;
  is_active?: boolean;
  sort_order?: number;
}

/**
 * Interface for CmsMenuItemsProjects instance
 */
export interface CmsMenuItemsProjectsInstance extends Model<CmsMenuItemsProjectsDTO>, CmsMenuItemsProjectsDTO { }

/**
 * CmsMenuItemsProjects model initialization
 */
export default class CmsMenuItemsProjects extends Model<CmsMenuItemsProjectsInstance, CmsMenuItemsProjectsDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<CmsMenuItemsProjects> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        cms_menu_item_parent_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        cms_menu_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        translation_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        url: {
          type: DataTypes.STRING,
          allowNull: true
        },
        icon: {
          type: DataTypes.STRING,
          allowNull: true
        },
        is_expanded: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        func: {
          type: DataTypes.STRING,
          allowNull: true
        },
        plugin_name: {
          type: DataTypes.STRING,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        sort_order: {
          type: DataTypes.INTEGER,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'CmsMenuItemsProjects'
      }
    );
  }

  static associate(models: any) {
    CmsMenuItemsProjects.hasMany(models.CmsMenuItemsPrivilegesProjects, { as: "menu_item_privileges", foreignKey: "cms_menu_item_id" });
    CmsMenuItemsProjects.belongsTo(models.Translations, { as: "translation", targetKey: 'id', foreignKey: "translation_id" });
  }

  static hooks(models: any, sequelize: Sequelize) {
    CmsMenuItemsProjects.beforeDestroy(async (item: any, options) => {
      console.log('beforeDestroy');

      await models.CmsMenuItemsPrivilegesProjects.destroy({
        where: { cms_menu_item_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      });

      await models.CmsMenuItemsProjects.destroy({
        where: { cms_menu_item_parent_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      });

      await models.Translations.destroy({
        where: { id: item.translation_id },
        transaction: options.transaction,
        individualHooks: true
      });
    });
  }
}