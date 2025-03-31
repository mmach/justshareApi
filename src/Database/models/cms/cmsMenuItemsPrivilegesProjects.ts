
import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { PrivilegesProjectDTO } from "../privileges/privilegesProject";

/**
 * Interface for CmsMenuItemsPrivilegesProjects attributes
 */
export interface CmsMenuItemsPrivilegesProjectsDTO {
  id: string;
  privilege_id?: string;
  cms_menu_item_id?: string;
  status?: string;
  project_id?: string;

  privileges?: PrivilegesProjectDTO;
}

/**
 * Interface for CmsMenuItemsPrivilegesProjects instance
 */
export interface CmsMenuItemsPrivilegesProjectsInstance extends Model<CmsMenuItemsPrivilegesProjectsDTO>, CmsMenuItemsPrivilegesProjectsDTO {}

/**
 * CmsMenuItemsPrivilegesProjects model initialization
 */
export default class CmsMenuItemsPrivilegesProjects extends Model<CmsMenuItemsPrivilegesProjectsInstance, CmsMenuItemsPrivilegesProjectsDTO> {
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