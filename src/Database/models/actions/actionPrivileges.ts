import { Model, ModelStatic, Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import { MappsDbModels } from "../models";

export interface ActionPrivilegesDTO {
  id: string;
  privilege_id: string;
  project_id: string;
  action_id: string;
  logical_op: string;
  status: boolean;

}

export interface ActionPrivilegesInstance extends Model<ActionPrivilegesDTO>, ActionPrivilegesDTO { }

export default class ActionPrivileges extends Model<ActionPrivilegesInstance, ActionPrivilegesDTO> {

  static initModel(sequelize: Sequelize): ModelStatic<ActionPrivileges> {
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
        },
        project_id: {
          type: DataTypes.UUID,
        },
        action_id: {
          type: DataTypes.UUID
        },
        logical_op: {
          type: DataTypes.STRING
        },
        status: {
          type: DataTypes.BOOLEAN
        },
      },
      { sequelize, tableName: 'ActionPrivileges' }
    );
  }
  static associate(models: MappsDbModels) {
    ActionPrivileges.belongsTo(models.PrivilegesProject, { as: "privileges", targetKey: 'id', foreignKey: "privilege_id" });
  }
}
