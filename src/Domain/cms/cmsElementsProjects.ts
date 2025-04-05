
import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { CmsElementsProjectsDBO } from "../../DBO/cms";

/**
 * Interface for CmsElementsProjects instance
 */
interface CmsElementsProjectsInstance extends Model<CmsElementsProjectsDBO>, CmsElementsProjectsDBO { }

/**
 * CmsElementsProjects model initialization
 */
export class CmsElementsProject extends Model<CmsElementsProjectsInstance, CmsElementsProjectsDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<CmsElementsProject> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        cms: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        load_on_init: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        token: {
          type: DataTypes.STRING,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        cms_element_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'CmsElementsProjects'
      }
    );
  }

  static hooks(models: any, sequelize: Sequelize) {
    CmsElementsProject.beforeDestroy(async (item: any, options) => {
      await models.CmsElementsProject.update(
        { cms_element_id: null },
        {
          where: { cms_element_id: item.id },
          transaction: options.transaction,
          individualHooks: true
        }
      );
    });
  }

  static associate(models: any) {
    CmsElementsProject.belongsTo(models.CmsElementsProject, { as: "cms_element", targetKey: 'id', foreignKey: "cms_element_id" });
  }
}