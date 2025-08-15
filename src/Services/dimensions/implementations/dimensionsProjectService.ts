import { BaseServiceType } from "../../../Architecture";
import { DimensionsProjectDBO } from "../../../DBO";
import { DI } from "../../../diTypes";
import { DimensionsProject } from "../../../Domain";
import { IDimensionsProjectService } from "../dimensionsProjectService";


export default class DimensionsProjectService extends BaseServiceType<DimensionsProjectDBO, DimensionsProject> implements IDimensionsProjectService {
  constructor({ unitOfWorkDI }: DI) {
    super({ unitOfWorkDI, repository: 'dimensionsProjectRepository' });
  }

  async getDimensions({ }): Promise<DimensionsProjectDBO[] | null> {
    let result = await this.toJsonParse<DimensionsProjectDBO[]>(this.unitOfWorkDI.dimensionsProjectRepository.getDimensions({}))

    return result;
  }

  async getDimensionsFlat({ }): Promise<DimensionsProjectDBO[] | null> {
    let result = await this.getDimensions({})
    result = result!.map(item => {
      return {
        name: item.dimension_details!.name,
        uniq: item.dimension_details!.uniq_name,
        cott_id: item.dimension_details!.cott_id,
        co_type_id: item.dimension_details!.co_type_id,
        id: item.id,
        as_cat_ref: item.dimension_details!.as_cat_ref
      }
    });
    return result;
  }

}


export const DimensionsProjectServicePlugin = {
  pluginName: "dimension-project-service",
  type: 'service',
  di: 'dimensionsProjectServiceDI',
  classType: DimensionsProjectService
} 
