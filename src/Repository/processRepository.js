import {BaseRepository} from "../Architecture/Base/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class ActionRepository
 * @extends BaseRepository
 */
export default class ProcessRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof ActionRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Process);
    this.sequelizeDI = sequelizeDI;
  }
  getProcess({ id, transaction }) {

    let where = {
      project_id: this.context.project.id

    };
    if (id) {
      where.id = Array.isArray(id) ? {
        [SequelizeDB.Sequelize.Op.in]: id
      } : id;;
    }


    return this.entityDAO.findAll({
      where: where,
      include: [
        {
          model: this.sequelizeDI.ProcessChain,
          as: "process_chain",
          include: [
            {
              model: this.sequelizeDI.ProcessChainState,
              as: "process_chain_state",
              required: false
            },

            {
              model: this.sequelizeDI.ProcessChainActionInjection,
              as: "process_chain_actions",
              required: false,
              include: [
                {
                  model: this.sequelizeDI.ProcessChainPrivilege,
                  as: "action_privileges",
                  required: false
                },
              ]
            },

          ],


        },
      ],

      transaction: this.getTran({ transaction })
    });
  }

  getItemReminder({reminder_cron,project_id ,transaction }) {
    return this.sequelizeDI.sequelize.query(
      `SELECT pcsp.id as process_chain_id,pcsp.process_id, ItemUserActions.id as item_id , ItemUserActions.project_id as project_id, 'IUA' as type  FROM 
      ItemUserActions 
            JOIN ProcessChainStates pccs ON  pccs.process_chain_id = ItemUserActions.process_chain_Id
            JOIN ProcessChains pcp ON pccs.next_process_chain_id = pcp.id
            JOIN ProcessChainStates pcs ON pcs.next_process_chain_id=pcp.id
            JOIN ProcessChains pcsp ON pcs.process_chain_Id = pcsp.id
            WHERE pcp.has_reminder=1
            AND pcsp.is_reminder=1
        and ItemUserActions.iua_id is null
        AND pcsp.reminder_cron=:reminder_cron
        UNION ALL
        SELECT pcsp.id as process_chain_id,pcsp.process_id, Items.id as item_id , Items.project_id as project_id ,'ITEM' FROM Items
            JOIN ItemProcessStates ON item_process_Id = ItemProcessStates.id
            JOIN ProcessChainStates pccs ON  pccs.process_chain_id = ItemProcessStates.process_chain_Id
            JOIN ProcessChains pcp ON pccs.next_process_chain_id = pcp.id
            JOIN ProcessChainStates pcs ON pcs.next_process_chain_id=pcp.id
            JOIN ProcessChains pcsp ON pcs.process_chain_Id = pcsp.id
            WHERE pcp.has_reminder=1
            AND pcsp.is_reminder=1
        AND pcsp.reminder_cron=:reminder_cron
  `
      ,
      {
        replacements: { reminder_cron: reminder_cron, project_id: project_id },

        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      });
  }

  getProcessCrons({ transaction }) {
    return this.sequelizeDI.sequelize.query(
      `	  SELECT project_id,reminder_cron FROM ProcessChains
          WHERE is_reminder =1 
            AND reminder_cron IS NOT NULL
          GROUP BY project_id,reminder_cron
      `
      ,
      {
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      });
  }
}