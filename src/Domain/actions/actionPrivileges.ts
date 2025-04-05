import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { ActionPrivilegesDBO } from "../../DBO/actions";
import { IMappsDbModels } from "../models";


interface ActionPrivilegesInstance extends Model<ActionPrivilegesDBO>, ActionPrivilegesDBO { }

export class ActionPrivileges extends Model<ActionPrivilegesInstance, ActionPrivilegesDBO> {

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
  static associate(models: IMappsDbModels) {
    ActionPrivileges.belongsTo(models.PrivilegesProject, { as: "privileges", targetKey: 'id', foreignKey: "privilege_id" });
  }
}
