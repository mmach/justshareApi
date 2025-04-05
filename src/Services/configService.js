import {BaseService} from "../Architecture/Base/baseService";
import BlobRepository from "../Repository/blob/blobRepository.js";

/**
 *
 * @export
 * @class BlobService
 * @extends BaseService
 */
export default class ConfigService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, blobRepositoryDI:BlobRepository}}
   */
  constructor({ unitOfWorkDI, blobRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'configRepository' });
  }

  async getByName({ name, lang }) {
    let result = await this.toJsonParse(
      this.unitOfWorkDI.configRepository.getByName({
        type: name,
        lang: lang
      })
    );
    return result.body
  }
  async getByNames({ names, lang }) {
    let result = await this.toJsonParse(
      this.unitOfWorkDI.configRepository.getByNames({
        types: names,
        lang: lang
      })
    );
    return result.map(item => {
      return { body: item.body, name: item.type }
    })
  }

}
