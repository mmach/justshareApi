'use strict';

import { Model } from "sequelize";
/**
 *
 * @export
 * @class Users
 * @extends Sequelize.Model
 */
export default class ProcessChainActionInjection extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {UserAuths|Model}
   * @memberof UserAuths
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: sequelize.UUIDV4

        },
        process_chain_id: DataTypes.UUID,
        action_id: DataTypes.UUID,
        project_id: DataTypes.UUID,
        action_type:DataTypes.STRING,
        action_group:DataTypes.STRING,
        func:DataTypes.STRING,
        sort_order:DataTypes.STRING,
        show_on_current:DataTypes.BOOLEAN,
        show_on_next:DataTypes.BOOLEAN,
        external_process_id:DataTypes.UUID,
        external_process_chain_id:DataTypes.UUID,
        ref_key:DataTypes.STRING,

      },
      { sequelize ,
        tableName: 'ProcessChainActionInjections'
}
    );
  }
  static associate(models) {
    ProcessChainActionInjection.hasMany(models.ProcessChainPrivilege, { as: "action_privileges", targetKey: 'id', foreignKey: "process_chain_action_id" });

    // Users.hasMany(models.UserAuth)
  }
  static hooks(models, sequelize) {
    ProcessChainActionInjection.beforeDestroy(async (process, options) => {


      await models.ProcessChainPrivilege.destroy({
        where: { process_chain_action_id: process.id },
        transaction: options.transaction,
        individualHooks: true
      })
      
     
    })

  }
}
