'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { ProcessChainDTO } from "./processChain";

/**
 * Interface for Process attributes
 */
export interface ProcessDTO {
  id: string;
  token?: string;
  project_id?: string;

  process_chain?: ProcessChainDTO[];

}

/**
 * Interface for Process instance
 */
export interface ProcessInstance extends Model<ProcessDTO>, ProcessDTO { }

/**
 * Process model initialization
 */
export default class Process extends Model<ProcessInstance, ProcessDTO> {
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