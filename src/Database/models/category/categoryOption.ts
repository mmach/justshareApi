
import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { CategoryOptionsTemplateDTO } from "../../../Dto";
import { TranslationsDTO } from "../translations/translations";
import { CategoryOptionsLinkDTO } from "./categoryOptionsLink";
import { CategoryOptionsTypeDTO } from "./categoryOptionsType";

/**
 * Interface for CategoryOption attributes
 */
export interface CategoryOptionAttributesDTO {
  id: string;
  cot_id?: string;
  name?: string;
  name_pl?: string;
  name_us?: string;
  name_de?: string;
  name_ru?: string;
  name_fr?: string;
  name_es?: string;
  name_no?: string;
  name_zh_cn?: string;
  status?: boolean;
  order?: number;
  is_searchable?: boolean;
  is_require?: boolean;
  limit_of?: number;
  is_on_pin_map?: boolean;
  is_on_iua?: boolean;
  is_on_iua_request?: boolean;
  is_params?: boolean;
  is_on_map?: boolean;
  is_on_main_page?: boolean;
  is_form_hidden?: boolean;
  search_label?: string;
  search_type?: string;
  show_value?: string;
  can_above_pin?: boolean;
  is_visible_view?: boolean;
  project_id?: string;
  dim_id?: string;
  order_search?: number;
  is_required?: number;
  is_required_message?: string;
  min_selected?: number;
  min_selected_dim_id_ref?: string;
  min_selected_message?: string;
  max_selected?: number;
  max_selected_dim_id_ref?: string;
  max_selected_message?: string;
  is_form_rendered?: boolean;
  search_params?: string;
  preview_params?: string;
  create_params?: string;
  translation_id?: string;

  cat_opt?: CategoryOptionsTypeDTO;
  cat_opt_temp?: CategoryOptionsTemplateDTO[];
  category_link?: CategoryOptionsLinkDTO[];
  translation?: TranslationsDTO;

}

/**
 * Interface for CategoryOption instance
 */
export interface CategoryOptionInstance extends Model<CategoryOptionAttributesDTO>, CategoryOptionAttributesDTO {}

/**
 * CategoryOption model initialization
 */
export default class CategoryOption extends Model<CategoryOptionInstance, CategoryOptionAttributesDTO> {
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