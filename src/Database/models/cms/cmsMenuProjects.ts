import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for CmsMenuProjects attributes
 */
export interface CmsMenuProjectsDTO {
  id: string;
  token?: string;
  load_on_init?: boolean;
  project_id?: string;
  is_active?: boolean;
}

/**
 * Interface for CmsMenuProjects instance
 */
export interface CmsMenuProjectsInstance extends Model<CmsMenuProjectsDTO>, CmsMenuProjectsDTO {}

/**
 * CmsMenuProjects model initialization
 */
export default class CmsMenuProjects extends Model<CmsMenuProjectsInstance, CmsMenuProjectsDTO> {
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