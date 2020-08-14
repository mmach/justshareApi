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
export default class StatusProjectService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionProjectRepositoryDI:}}
   */
  constructor({ unitOfWorkDI, actionProjectRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'statusProjectsRepository' });
  }


  async upsertGlobal({ model }) {
    return await this.unitOfWorkDI.statusRepository.upsert({ model: model, withProject: false })
  }

  async getGlobalStatuses({ }) {
    return await this.unitOfWorkDI.statusRepository.getGlobalStatuses({})

  }
  async getByProjectStatuses({ }) {
    return await this.unitOfWorkDI.statusProjectsRepository.getByProjectStatuses({})


  }
  async linkStatus({ model }) {
    return await this.unitOfWorkDI.statusActionsRepository.upsert({ model: model, withProject: false })

  }
  async unlinkStatus({ model }) {
    return await this.unitOfWorkDI.statusActionsRepository.deleteStatus({ action_id: model.action_id, status_id: model.status_id, withProject: false })

  }
  async getByToken({ name }) {
    return await this.toJsonParse(this.unitOfWorkDI.statusProjectsRepository.getByToken({ name: name, withProject: true }))

  }
}
