import BaseService from "../Architecture/baseService.js";
import fs from "fs-extra";
import ServerException from "../Architecture/Exceptions/serverException.js";
import CONFIG from "../config.js";
import uuidv4 from "uuid/v4";



/**
 *
 * @export
 * @class ActionService
 * @extends BaseService
 */
export default class ProcessService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionProjectRepositoryDI:}}
   */
  constructor({ unitOfWorkDI }) {
    super({ unitOfWorkDI, repository: 'processRepository' });
  }

  async upsertChain({ model }) {
    return await this.unitOfWorkDI.processChainRepository.upsert({ model, withProject: true })
  }

  async upsertChainState({ model }) {
    return await this.unitOfWorkDI.processChainStateRepository.upsert({ model, withProject: true })
  }
  async deleteChain({ model }) {
    return await this.unitOfWorkDI.processChainRepository.delete({ model, withProject: true })
  }

  async deleteChainState({ model }) {
    return await this.unitOfWorkDI.processChainStateRepository.delete({ model, withProject: true })
  }

  async getProcess({ id }) {
    return await this.toJsonParse(this.unitOfWorkDI.processRepository.getProcess({ id, withProject: true }));

  }
}
