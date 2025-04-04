import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { CmsPagePrivilegesProjectsDTO } from "../../../Models/cms/cmsPagePrivilegesProjects";

/**
 * Interface for CmsPagePrivilegesProjects instance
 */
export interface CmsPagePrivilegesProjectsInstance extends Model<CmsPagePrivilegesProjectsDTO>, CmsPagePrivilegesProjectsDTO {}

/**
 * CmsPagePrivilegesProjects model initialization
 */
export default class CmsPagePrivilegesProjects extends Model<CmsPagePrivilegesProjectsInstance, CmsPagePrivilegesProjectsDTO> {
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