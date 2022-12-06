"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class CategoryOptionsTemplate extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {Region|Model}
   * @memberof CategoryOptionsTemplate
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
        co_id: {
          type: DataTypes.UUID
        },
        cott_id: {
          type: DataTypes.UUID
        },
        value: {
          type: DataTypes.STRING,
        },
        value_pl: {
          type: DataTypes.STRING,
        },
        value_us: {
          type: DataTypes.STRING,

        },
        value_de: {
          type: DataTypes.STRING,

        },
        value_ru: {
          type: DataTypes.STRING,

        },
        value_fr: {
          type: DataTypes.STRING,

        }, value_es: {
          type: DataTypes.STRING,

        },
        value_no: {
          type: DataTypes.STRING,

        },
        value_zh_cn: {
          type: DataTypes.STRING,
        },
        placeholder: {
          type: DataTypes.STRING,
        },
        placeholder_pl: {
          type: DataTypes.STRING,
        },
        placeholder_us: {
          type: DataTypes.STRING,

        },
        placeholder_de: {
          type: DataTypes.STRING,

        },
        placeholder_ru: {
          type: DataTypes.STRING,

        },
        placeholder_fr: {
          type: DataTypes.STRING,

        }, placeholder_es: {
          type: DataTypes.STRING,

        },
        placeholder_no: {
          type: DataTypes.STRING,

        },
        placeholder_zh_cn: {
          type: DataTypes.STRING,
        },
        token: {
          type: DataTypes.STRING,
        }
        , status: {
          type: DataTypes.BOOLEAN,
        },
        order: {
          type: DataTypes.INTEGER,
        },
        is_not_in_clob: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        func: {
          type: DataTypes.STRING,
        },
        is_visible_view: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_visible_form: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_visible_search: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        dim_ref_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        dim_id: DataTypes.UUID,
        is_readOnly: {
          field: 'is_readOnly',
          type: DataTypes.BOOLEAN
        },
        is_from_url: DataTypes.BOOLEAN,
        
        is_default_value: DataTypes.BOOLEAN,
        default_value: DataTypes.STRING,
        input_format: DataTypes.STRING,
        is_required: DataTypes.BOOLEAN,
        is_required_message: DataTypes.STRING,
        min: DataTypes.INTEGER,
        min_dim_id_ref: DataTypes.UUID,
        min_message: DataTypes.STRING,
        max: DataTypes.INTEGER,
        max_dim_id_ref: DataTypes.UUID,
        max_message: DataTypes.STRING,
        max_length: DataTypes.INTEGER,
        max_length_message: DataTypes.STRING,
        min_length: DataTypes.INTEGER,
        min_length_message: DataTypes.STRING,
        pattern: DataTypes.STRING,
        pattern_message: DataTypes.STRING,
        thousand_separator: DataTypes.BOOLEAN,
        mask: DataTypes.STRING,
        allow_negative: DataTypes.BOOLEAN,
        allow_empty_formatting: DataTypes.BOOLEAN,
        allow_leading_zeros: DataTypes.BOOLEAN,
        decimal_separator: DataTypes.STRING,
        decimal_scale: DataTypes.INTEGER,
        is_prefix: DataTypes.BOOLEAN,
        is_suffix: DataTypes.BOOLEAN,
        value_translation_id: DataTypes.UUID,
      },
      {
        sequelize,
        tableName: 'CategoryOptionsTemplates'
      }
    );
  }
  static associate(models) {
    CategoryOptionsTemplate.belongsTo(models.CategoryOptionsTypeTemplate, { as: "cat_opt_type_template", targetKey: 'id', foreignKey: "cott_id" });
    CategoryOptionsTemplate.belongsTo(models.Translations, { as: "value_translation", targetKey: 'id', foreignKey: "value_translation_id" });

  }
}
