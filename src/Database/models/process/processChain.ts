'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { ProcessChainDTO } from "../../../Models/process";
/**
 * Interface for ProcessChain instance
 */
export interface ProcessChainInstance extends Model<ProcessChainDTO>, ProcessChainDTO { }

/**
 * ProcessChain model initialization
 */
export default class ProcessChain extends Model<ProcessChainInstance, ProcessChainDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<ProcessChain> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        status_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        action_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        process_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        is_reminder: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        in_days: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        x: {
          type: DataTypes.FLOAT,
          allowNull: true
        },
        y: {
          type: DataTypes.FLOAT,
          allowNull: true
        },
        autorun: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_start: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_last: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        has_reminder: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        change_status: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        use_es: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        params: {
          type: DataTypes.STRING,
          allowNull: true
        },
        reminder_cron: {
          type: DataTypes.STRING,
          allowNull: true
        },
        invoke_only: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_condition: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_autoclose_state: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'ProcessChains'
      }
    );
  }

  static associate(models: any) {
    ProcessChain.hasMany(models.ProcessChainState, { as: "process_chain_state", foreignKey: "process_chain_id" });
    ProcessChain.hasMany(models.ProcessChainActionInjection, { as: "process_chain_actions", foreignKey: "process_chain_id" });
  }

  static hooks(models: any, sequelize: Sequelize) {
    ProcessChain.beforeDestroy(async (process: any, options) => {
      await models.ProcessChainActionInjection.destroy({
        where: { process_chain_id: process.id },
        transaction: options.transaction,
        individualHooks: true
      });
      await models.ProcessChainState.destroy({
        where: { process_chain_id: process.id },
        transaction: options.transaction,
        individualHooks: true
      });
      await models.ProcessChainState.destroy({
        where: { next_process_chain_id: process.id },
        transaction: options.transaction,
        individualHooks: true
      });
    });
  }
}