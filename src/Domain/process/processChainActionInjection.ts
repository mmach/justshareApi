'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { ProcessChainActionInjectionDBO } from "../../DBO/process";

/**
 * Interface for ProcessChainActionInjection instance
 */
interface ProcessChainActionInjectionInstance extends Model<ProcessChainActionInjectionDBO>, ProcessChainActionInjectionDBO { }

/**
 * ProcessChainActionInjection model initialization
 */
export class ProcessChainActionInjection extends Model<ProcessChainActionInjectionInstance, ProcessChainActionInjectionDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<ProcessChainActionInjection> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        process_chain_id: {
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
        action_type: {
          type: DataTypes.STRING,
          allowNull: true
        },
        action_group: {
          type: DataTypes.STRING,
          allowNull: true
        },
        func: {
          type: DataTypes.STRING,
          allowNull: true
        },
        sort_order: {
          type: DataTypes.STRING,
          allowNull: true
        },
        show_on_current: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        show_on_next: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        external_process_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        external_process_chain_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        ref_key: {
          type: DataTypes.STRING,
          allowNull: true
        },
        on_before_hook: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        on_after_hook: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'ProcessChainActionInjections'
      }
    );
  }

  static associate(models: any) {
    ProcessChainActionInjection.hasMany(models.ProcessChainPrivilege, { as: "action_privileges", foreignKey: "process_chain_action_id" });
  }

  static hooks(models: any, sequelize: Sequelize) {
    ProcessChainActionInjection.beforeDestroy(async (process: any, options) => {
      await models.ProcessChainPrivilege.destroy({
        where: { process_chain_action_id: process.id },
        transaction: options.transaction,
        individualHooks: true
      });
    });
  }
}