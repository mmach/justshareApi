import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { TranslationsDTO } from "../translations/translations";
import { CmsPagePrivilegesProjectsDTO } from "./cmsPagePrivilegesProjects";

/**
 * Interface for CmsPagesProjects attributes
 */
export interface CmsPagesProjectsDTO {
  id: string;
  title?: string;
  translation_id?: string;
  url?: boolean;
  project_id?: string;
  is_active?: boolean;
  url_exact?: boolean;
  cms?: string;
  layout_plugin_name?: string;
  is_homepage?: boolean;
  route_group?: string;
  func?: string;

  translation?: TranslationsDTO;
  page_privileges?: CmsPagePrivilegesProjectsDTO[];
}

/**
 * Interface for CmsPagesProjects instance
 */
export interface CmsPagesProjectsInstance extends Model<CmsPagesProjectsDTO>, CmsPagesProjectsDTO { }

/**
 * CmsPagesProjects model initialization
 */
export default class CmsPagesProjects extends Model<CmsPagesProjectsInstance, CmsPagesProjectsDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<CmsPagesProjects> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        title: {
          type: DataTypes.STRING,
          allowNull: true
        },
        translation_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        url: {
          type: DataTypes.BOOLEAN,
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
        url_exact: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        cms: {
          type: DataTypes.STRING,
          allowNull: true
        },
        layout_plugin_name: {
          type: DataTypes.STRING,
          allowNull: true
        },
        is_homepage: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        route_group: {
          type: DataTypes.STRING,
          allowNull: true
        },
        func: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'CmsPageProjects'
      }
    );
  }

  static associate(models: any) {
    CmsPagesProjects.belongsTo(models.Translations, { as: "translation", targetKey: 'id', foreignKey: "translation_id" });
    CmsPagesProjects.hasMany(models.CmsPagePrivilegesProjects, { as: "page_privileges", foreignKey: "cms_page_id" });
  }

  static hooks(models: any, sequelize: Sequelize) {
    CmsPagesProjects.beforeDestroy(async (item: any, options) => {
      console.log('beforeDestroy');

      await models.CmsPagePrivilegesProjects.destroy({
        where: { cms_page_id: item.id },
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