
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { ActionsProjectDBO } from "../../DBO/actions";



interface ActionsProjectInstance extends Model<ActionsProjectDBO>, ActionsProjectDBO { }


export class ActionsProject extends Model<ActionsProjectInstance, ActionsProjectDBO> {
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