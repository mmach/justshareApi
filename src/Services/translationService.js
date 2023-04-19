import BaseService from "../Architecture/baseService.js";



/**
 *
 * @export
 * @class ActionService
 * @extends BaseService
 */
export default class TranslationService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionPrivilegesRepositoryDI:}}
   */
  constructor({ unitOfWorkDI, actionPrivilegesRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'translationRepository' });
  }
  async getTokens({ code, token }) {
    let result = await this.unitOfWorkDI.translationRepository.getTokens({ code, token })
    let formatResult = {}
    result.forEach(item => {
      if (item.type && !formatResult[item.type]) {
        formatResult[item.type] = {}
      }
      if (item.type && item.token) {
        formatResult[item.type][item.token] = {
          "id": item.id,
          "uid": "",
          "code": item.token,
          "status": item.respStatus,
          "type": item.type,
          "message": {
            "id":item.id,
            "pl": item.pl,
            "us": item.us,
            "de": item.de,
            "ru": item.ru,
            "fr": item.fr,
            "es": item.es,
            "no": item.no,
            "zh_cn": item.zh_cn,
            "token":item.token,
            "name":item.name,
          },
          "field": "",
          "toRefresh": true
        }
      }
    })
    return formatResult

  }

}
