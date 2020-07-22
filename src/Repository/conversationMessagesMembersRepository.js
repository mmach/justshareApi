import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";


/**
 *
 * @export
 * @class CityRepository
 * @extends BaseRepository
 */
export default class ConversationMessagesMembersRepository extends BaseRepository {
  /**
   *Creates an instance of CategoryRepository.
   * @param {{sequelizeDI:SequelizeDB}}
   * @memberof CityRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.ConversationMessageMembers);
    this.sequelizeDI = sequelizeDI;
  }

  getUnreadMsg({ transaction }) {
    return this.entityDAO.findAll({
      where: {
        project_id: this.context.project.id,
        status: 'N',
        user_id: this.context.user.id
      }
    })


  }

}
