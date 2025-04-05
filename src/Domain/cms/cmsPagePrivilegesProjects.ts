import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { CmsPagePrivilegesProjectsDBO } from "../../DBO/cms/cmsPagePrivilegesProjects";

/**
 * Interface for CmsPagePrivilegesProjects instance
 */
interface CmsPagePrivilegesProjectsInstance extends Model<CmsPagePrivilegesProjectsDBO>, CmsPagePrivilegesProjectsDBO {}

/**
 * CmsPagePrivilegesProjects model initialization
 */
export class CmsPagePrivilegesProjects extends Model<CmsPagePrivilegesProjectsInstance, CmsPagePrivilegesProjectsDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<CmsPagePrivilegesProjects> {
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
        cms_page_id: {
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
        tableName: 'CmsPagePrivilegesProjects'
      }
    );
  }

  static associate(models: any) {
    CmsPagePrivilegesProjects.belongsTo(models.PrivilegesProject, { as: "privileges", targetKey: 'id', foreignKey: "privilege_id" });
  }
}