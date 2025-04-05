
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { CategoryOptionAttributesDBO } from "../../DBO/category";

/**
 * Interface for CategoryOption instance
 */
interface CategoryOptionInstance extends Model<CategoryOptionAttributesDBO>, CategoryOptionAttributesDBO {}

/**
 * CategoryOption model initialization
 */
export class CategoryOption extends Model<CategoryOptionInstance, CategoryOptionAttributesDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<CategoryOption> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        cot_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        name_pl: {
          type: DataTypes.STRING,
          allowNull: true
        },
        name_us: {
          type: DataTypes.STRING,
          allowNull: true
        },
        name_de: {
          type: DataTypes.STRING,
          allowNull: true
        },
        name_ru: {
          type: DataTypes.STRING,
          allowNull: true
        },
        name_fr: {
          type: DataTypes.STRING,
          allowNull: true
        },
        name_es: {
          type: DataTypes.STRING,
          allowNull: true
        },
        name_no: {
          type: DataTypes.STRING,
          allowNull: true
        },
        name_zh_cn: {
          type: DataTypes.STRING,
          allowNull: true
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        order: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        is_searchable: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_require: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        limit_of: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        is_on_pin_map: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_on_iua: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_on_iua_request: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_params: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_on_map: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_on_main_page: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_form_hidden: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        search_label: {
          type: DataTypes.STRING,
          allowNull: true
        },
        search_type: {
          type: DataTypes.STRING,
          allowNull: true
        },
        show_value: {
          type: DataTypes.STRING,
          allowNull: true
        },
        can_above_pin: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_visible_view: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        dim_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        order_search: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        is_required: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        is_required_message: {
          type: DataTypes.STRING,
          allowNull: true
        },
        min_selected: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        min_selected_dim_id_ref: {
          type: DataTypes.UUID,
          allowNull: true
        },
        min_selected_message: {
          type: DataTypes.STRING,
          allowNull: true
        },
        max_selected: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        max_selected_dim_id_ref: {
          type: DataTypes.UUID,
          allowNull: true
        },
        max_selected_message: {
          type: DataTypes.STRING,
          allowNull: true
        },
        is_form_rendered: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        search_params: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        preview_params: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        create_params: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        translation_id: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'CategoryOptions'
      }
    );
  }

  static associate(models: any) {
    CategoryOption.belongsTo(models.CategoryOptionsType, { as: "cat_opt", targetKey: 'id', foreignKey: "cot_id" });
    CategoryOption.hasMany(models.CategoryOptionsTemplate, { as: "cat_opt_temp",  foreignKey: "co_id" });
    CategoryOption.hasMany(models.CategoryOptionsLink, { as: "category_link",  foreignKey: "co_id" });
    CategoryOption.belongsTo(models.Translations, { as: "translation", targetKey: 'id', foreignKey: "translation_id" });
  }
}