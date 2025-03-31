
import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { ActionsDTO } from "./actions";
import { ActionPrivilegesDTO } from "./actionPrivileges";
import { StatusActionsDTO } from "../status/statusActions";
import { ProcessDTO } from "../process/process";


export interface ActionsProjectDTO {
  id: string;
  action_id?: string;
  project_id?: boolean;
  status?: string;
  func?: string;
  process_id?: string;
  
  action_details: ActionsDTO
  action_privileges: ActionPrivilegesDTO[]
  statuses: StatusActionsDTO[]
  process?: ProcessDTO
}


export interface ActionsProjectInstance extends Model<ActionsProjectDTO>, ActionsProjectDTO { }


export default class ActionsProject extends Model<ActionsProjectInstance, ActionsProjectDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<ActionsProject> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        action_id: {
          type: DataTypes.STRING,
          allowNull: true
        },
        project_id: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        status: {
          type: DataTypes.STRING,
          allowNull: true
        },
        func: {
          type: DataTypes.STRING,
          allowNull: true
        },
        process_id: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'ActionsProjects'
      }
    );
  }

  static associate(models: any) {
    ActionsProject.belongsTo(models.Actions, { as: "action_details", targetKey: 'id', foreignKey: "action_id" });
    ActionsProject.hasMany(models.ActionPrivileges, { as: "action_privileges", foreignKey: "action_id" });
    ActionsProject.hasMany(models.StatusActions, { as: "statuses", foreignKey: "action_id" });
    ActionsProject.belongsTo(models.Process, { as: "process", targetKey: 'id', foreignKey: "process_id" });
  }
}