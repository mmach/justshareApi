
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { CmsMenuItemsPrivilegesProjectsDBO } from "../../DBO/cms/cmsMenuItemsPrivilegesProjects";
/**
 * Interface for CmsMenuItemsPrivilegesProjects instance
 */
interface CmsMenuItemsPrivilegesProjectsInstance extends Model<CmsMenuItemsPrivilegesProjectsDBO>, CmsMenuItemsPrivilegesProjectsDBO {}

/**
 * CmsMenuItemsPrivilegesProjects model initialization
 */
export class CmsMenuItemsPrivilegesProjects extends Model<CmsMenuItemsPrivilegesProjectsInstance, CmsMenuItemsPrivilegesProjectsDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<CmsMenuItemsPrivilegesProjects> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        privilege_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        cms_menu_item_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        status: {
          type: DataTypes.UUID,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'CmsMenuItemsPrivilegesProjects'
      }
    );
  }

  static associate(models: any) {
    CmsMenuItemsPrivilegesProjects.belongsTo(models.PrivilegesProject, { as: "privileges", targetKey: 'id', foreignKey: "privilege_id" });
  }
}