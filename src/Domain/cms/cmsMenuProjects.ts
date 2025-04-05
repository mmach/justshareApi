import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { CmsMenuProjectsDBO } from "../../DBO/cms/cmsMenuProjects";
/**
 * Interface for CmsMenuProjects instance
 */
interface CmsMenuProjectsInstance extends Model<CmsMenuProjectsDBO>, CmsMenuProjectsDBO {}

/**
 * CmsMenuProjects model initialization
 */
export class CmsMenuProjects extends Model<CmsMenuProjectsInstance, CmsMenuProjectsDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<CmsMenuProjects> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        token: {
          type: DataTypes.STRING,
          allowNull: true
        },
        load_on_init: {
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
        }
      },
      { 
        sequelize,
        tableName: 'CmsMenuProjects'
      }
    );
  }

  static associate(models: any) {
    CmsMenuProjects.hasMany(models.CmsMenuItemsProjects, { as: "menu_items", foreignKey: "cms_menu_id" });
  }

  static hooks(models: any, sequelize: Sequelize) {
    CmsMenuProjects.beforeDestroy(async (item:any, options) => {
      console.log('beforeDestroy');

      await models.CmsMenuItemsProjects.destroy({
        where: { cms_menu_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      });
    });
  }
}