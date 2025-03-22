'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for ProcessChainPrivilege attributes
 */
export interface ProcessChainPrivilegeDTO {
  id: string;
  process_chain_action_id?: string;
  process_chain_id?: string;
  privilege_id?: string;
  project_id?: string;
}

/**
 * Interface for ProcessChainPrivilege instance
 */
export interface ProcessChainPrivilegeInstance extends Model<ProcessChainPrivilegeDTO>, ProcessChainPrivilegeDTO {}

/**
 * ProcessChainPrivilege model initialization
 */
export default class ProcessChainPrivilege extends Model<ProcessChainPrivilegeInstance, ProcessChainPrivilegeDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<ProcessChainPrivilege> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        process_chain_action_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        process_chain_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        privilege_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'ProcessChainPrivileges'
      }
    );
  }

  static associate(models: any) {
    // Define associations here
  }

  static hooks(models: any, sequelize: Sequelize) {
    // Define hooks here
  }
}