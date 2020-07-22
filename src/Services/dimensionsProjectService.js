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
export default class DimensionsProjectService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionProjectRepositoryDI:}}
   */
  constructor({ unitOfWorkDI, dimensionsProjectRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'dimensionsProjectRepository' });
  }

  async getDimensions({  }) {
    let result = await this.toJsonParse( this.unitOfWorkDI.dimensionsProjectRepository.getDimensions({  }))

    return result;
  }

  async getDimensionsFlat({  }) {
    let result = await this.toJsonParse( this.unitOfWorkDI.dimensionsProjectRepository.getDimensions({  }))
    result=result.map(item => {
      return {
          name: item.dimension_details.name,
          uniq: item.dimension_details.uniq_name,
          cott_id: item.dimension_details.cott_id,
          co_type_id: item.dimension_details.co_type_id,
          id: item.id,
          as_cat_ref: item.dimension_details.as_cat_ref
      }
  });
    return result;
  }

}
