import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { CmsPagesProjectsDBO } from "../../DBO/cms";

/**
 * Interface for CmsPagesProjects instance
 */
interface CmsPagesProjectsInstance extends Model<CmsPagesProjectsDBO>, CmsPagesProjectsDBO { }

/**
 * CmsPagesProjects model initialization
 */
export class CmsPagesProjects extends Model<CmsPagesProjectsInstance, CmsPagesProjectsDBO> {
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