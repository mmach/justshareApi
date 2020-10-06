import BaseRepository from "../Architecture/baseRepository.js";
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
      where.id = id;
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
          ],

        },
      ],

      transaction: this.getTran({ transaction })
    });
  }
}
