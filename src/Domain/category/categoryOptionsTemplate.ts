'use strict';
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { CategoryOptionsTemplateDBO } from "../../DBO/category";

interface CategoryOptionsTemplateInstance extends Model<CategoryOptionsTemplateDBO>, CategoryOptionsTemplateDBO { }

export class CategoryOptionsTemplate extends Model<CategoryOptionsTemplateInstance, CategoryOptionsTemplateDBO> {
    static initModel(sequelize: Sequelize): ModelStatic<CategoryOptionsTemplate> {
        return super.init(
            {
                id: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                    autoIncrement: false,
                    defaultValue: DataTypes.UUIDV4
                },
                co_id: { type: DataTypes.UUID },
                cott_id: { type: DataTypes.UUID },
                value: { type: DataTypes.STRING },
                value_pl: { type: DataTypes.STRING },
                value_us: { type: DataTypes.STRING },
                value_de: { type: DataTypes.STRING },
                value_ru: { type: DataTypes.STRING },
                value_fr: { type: DataTypes.STRING },
                value_es: { type: DataTypes.STRING },
                value_no: { type: DataTypes.STRING },
                value_zh_cn: { type: DataTypes.STRING },
                placeholder: { type: DataTypes.STRING },
                placeholder_pl: { type: DataTypes.STRING },
                placeholder_us: { type: DataTypes.STRING },
                placeholder_de: { type: DataTypes.STRING },
                placeholder_ru: { type: DataTypes.STRING },
                placeholder_fr: { type: DataTypes.STRING },
                placeholder_es: { type: DataTypes.STRING },
                placeholder_no: { type: DataTypes.STRING },
                placeholder_zh_cn: { type: DataTypes.STRING },
                token: { type: DataTypes.STRING },
                status: { type: DataTypes.BOOLEAN },
                order: { type: DataTypes.INTEGER },
                is_not_in_clob: { type: DataTypes.BOOLEAN, allowNull: true },
                func: { type: DataTypes.STRING },
                is_visible_view: { type: DataTypes.BOOLEAN, allowNull: true },
                is_visible_form: { type: DataTypes.BOOLEAN, allowNull: true },
                is_visible_search: { type: DataTypes.BOOLEAN, allowNull: true },
                dim_ref_id: { type: DataTypes.UUID, allowNull: true },
                dim_id: { type: DataTypes.UUID },
                is_readOnly: { field: 'is_readOnly', type: DataTypes.BOOLEAN },
                is_from_url: { type: DataTypes.BOOLEAN },
                is_default_value: { type: DataTypes.BOOLEAN },
                default_value: { type: DataTypes.STRING },
                input_format: { type: DataTypes.STRING },
                is_required: { type: DataTypes.BOOLEAN },
                is_required_message: { type: DataTypes.STRING },
                min: { type: DataTypes.INTEGER },
                min_dim_id_ref: { type: DataTypes.UUID },
                min_message: { type: DataTypes.STRING },
                max: { type: DataTypes.INTEGER },
                max_dim_id_ref: { type: DataTypes.UUID },
                max_message: { type: DataTypes.STRING },
                max_length: { type: DataTypes.INTEGER },
                max_length_message: { type: DataTypes.STRING },
                min_length: { type: DataTypes.INTEGER },
                min_length_message: { type: DataTypes.STRING },
                pattern: { type: DataTypes.STRING },
                pattern_message: { type: DataTypes.STRING },
                thousand_separator: { type: DataTypes.BOOLEAN },
                mask: { type: DataTypes.STRING },
                allow_negative: { type: DataTypes.BOOLEAN },
                allow_empty_formatting: { type: DataTypes.BOOLEAN },
                allow_leading_zeros: { type: DataTypes.BOOLEAN },
                decimal_separator: { type: DataTypes.STRING },
                decimal_scale: { type: DataTypes.INTEGER },
                is_prefix: { type: DataTypes.BOOLEAN },
                is_suffix: { type: DataTypes.BOOLEAN },
                value_translation_id: { type: DataTypes.UUID }
            },
            {
                sequelize,
                tableName: 'CategoryOptionsTemplates'
            }
        );
    }

    static associate(models: any) {
        CategoryOptionsTemplate.belongsTo(models.CategoryOptionsTypeTemplate, { as: "cat_opt_type_template", targetKey: 'id', foreignKey: "cott_id" });
        CategoryOptionsTemplate.belongsTo(models.Translations, { as: "value_translation", targetKey: 'id', foreignKey: "value_translation_id" });
    }
}
