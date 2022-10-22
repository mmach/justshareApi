import BaseService from "../Architecture/baseService.js";



/**
 *
 * @export
 * @class ActionService
 * @extends BaseService
 */
export default class CommentService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionPrivilegesRepositoryDI:}}
   */
  constructor({ unitOfWorkDI }) {
    super({ unitOfWorkDI, repository: 'commentRepository' });
  }
  async getByIUA({ iua_id }) {
    let message_list_id = await this.toJsonParse(this.unitOfWorkDI.commentRepository.getByIUA({
      iua_id
    }));
    return message_list_id
  }

}
