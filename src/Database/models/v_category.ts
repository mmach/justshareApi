'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for V_Category attributes
 */
export interface V_CategoryDTO {
  id: string;
  category?: string;
  category_pl?: string;
  category_us?: string;
  category_de?: string;
  category_ru?: string;
  category_fr?: string;
  category_es?: string;
  category_no?: string;
  category_zh_cn?: string;
  status?: number;
  forThing?: number;
  forSell?: number;
  forEvent?: number;
  expired_day?: number;
  project_id?: string;
  blob_id?: string;
  color?: string;
  translation_id?: string;
  process_id?: string;
  cms_preview?: string;
  cms_create?: string;
  cms_edit?: string;
  cms_search?: string;
}

/**
 * Interface for V_Category instance
 */
export interface V_CategoryInstance extends Model<V_CategoryDTO>, V_CategoryDTO {}

/**
 * V_Category model initialization
 */
export default class V_Category extends Model<V_CategoryInstance, V_CategoryDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<V_Category> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false
        },
        category_pl: DataTypes.STRING,
        category_us: DataTypes.STRING,
        category_de: DataTypes.STRING,
        category_ru: DataTypes.STRING,
        category_fr: DataTypes.STRING,
        category_es: DataTypes.STRING,
        category_no: DataTypes.STRING,
        category_zh_cn: DataTypes.STRING,
        status: DataTypes.INTEGER,
        forThing: {
          field: 'forThing',
          type: DataTypes.INTEGER
        },
        forSell: {
          field: 'forSell',
          type: DataTypes.INTEGER
        },
        forEvent: {
          field: 'forEvent',
          type: DataTypes.INTEGER
        },
        expired_day: DataTypes.INTEGER,
        project_id: DataTypes.UUID,
        blob_id: DataTypes.UUID,
        color: DataTypes.STRING,
        translation_id: DataTypes.UUID,
        process_id: DataTypes.UUID,
        cms_preview: DataTypes.STRING,
        cms_create: DataTypes.STRING,
        cms_edit: DataTypes.STRING,
        cms_search: DataTypes.STRING
      },
      {
        sequelize,
        tableName: 'V_Categories'
      }
    );
  }

  static associate(models: any) {
    V_Category.belongsToMany(models.V_Category, {
      through: { model: models.CategoryHierarchy },
      as: 'category_children',
      targetKey: 'id',
      foreignKey: "category_parent_id"
    });

    V_Category.belongsTo(models.Blob, { as: "icon_blob", targetKey: 'id', foreignKey: "blob_id" });
    V_Category.hasMany(models.CategoryActions, { as: "actions", foreignKey: "category_id" });

    V_Category.belongsToMany(models.V_Category, {
      through: { model: models.CategoryHierarchy },
      as: 'category_parent',
      targetKey: 'id',
      foreignKey: "category_child_id"
    });

    V_Category.belongsTo(models.Translations, { as: "translation", targetKey: 'id', foreignKey: "translation_id" });
  }
}