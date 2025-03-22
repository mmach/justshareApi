'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for ProcessChainActionInjection attributes
 */
export interface ProcessChainActionInjectionDTO {
  id: string;
  process_chain_id?: string;
  action_id?: string;
  project_id?: string;
  action_type?: string;
  action_group?: string;
  func?: string;
  sort_order?: string;
  show_on_current?: boolean;
  show_on_next?: boolean;
  external_process_id?: string;
  external_process_chain_id?: string;
  ref_key?: string;
  on_before_hook?: boolean;
  on_after_hook?: boolean;
}

/**
 * Interface for ProcessChainActionInjection instance
 */
export interface ProcessChainActionInjectionInstance extends Model<ProcessChainActionInjectionDTO>, ProcessChainActionInjectionDTO { }

/**
 * ProcessChainActionInjection model initialization
 */
export default class ProcessChainActionInjection extends Model<ProcessChainActionInjectionInstance, ProcessChainActionInjectionDTO> {
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