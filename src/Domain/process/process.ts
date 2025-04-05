'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { ProcessDBO } from "../../DBO/process";
/**
 * Interface for Process instance
 */
interface ProcessInstance extends Model<ProcessDBO>, ProcessDBO { }

/**
 * Process model initialization
 */
export class Process extends Model<ProcessInstance, ProcessDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<Process> {
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
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'Processes'
      }
    );
  }

  static associate(models: any) {
    Process.hasMany(models.ProcessChain, { as: "process_chain",  foreignKey: "process_id" });
  }

  static hooks(models: any, sequelize: Sequelize) {
    Process.beforeDestroy(async (process: any, options) => {
      await models.ProcessChain.destroy({
        where: { process_id: process.id },
        transaction: options.transaction,
        individualHooks: true
      });
    });
  }
}