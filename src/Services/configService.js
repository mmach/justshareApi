import BaseService from "../Architecture/baseService.js";
import BlobRepository from "../Repository/blobRepository.js";
import fs from "fs-extra";
import ServerException from "../Architecture/Exceptions/serverException.js";
import CONFIG from "../config.js";
import uuidv4 from "uuid/v4";
import Jimp from "jimp";

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
