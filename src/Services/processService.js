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
    await this.unitOfWorkDI.processChainRepository.upsert({ model, withProject: true })
    let actions = model.process_chain_actions.map(i => this.upsertChainAction({ model: i, withProject: true }))
    await Promise.all(actions)
  }

  async upsertChainState({ model }) {
    return await this.unitOfWorkDI.processChainStateRepository.upsert({ model, withProject: true })
  }
  async upsertChainAction({ model }) {
    return await this.unitOfWorkDI.processChainActionInjectionRepository.upsert({ model, withProject: true })
  }
  async upsertChainActionPrivilege({ model }) {
    return await this.unitOfWorkDI.processChainPrivilegesRepository.upsert({ model, withProject: true })
  }
  async deleteChainActionPrivilege({ model }) {
    return await this.unitOfWorkDI.processChainPrivilegesRepository.delete({ model, withProject: true })

  }
  async deleteChainAction({ model }) {
    return await this.unitOfWorkDI.processChainActionInjectionRepository.delete({ model, withProject: true })

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

  async getProcessCrons({ id }) {
    return await this.unitOfWorkDI.processRepository.getProcessCrons({  });
  }

  async getItemReminder({  reminder_cron, project_id }) {
    return await this.unitOfWorkDI.processRepository.getItemReminder({reminder_cron, project_id});
  }

}
