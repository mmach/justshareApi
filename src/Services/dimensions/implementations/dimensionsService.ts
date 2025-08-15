import { BaseServiceType } from "../../../Architecture";
import { DimensionsDBO } from "../../../DBO";
import { DI } from "../../../diTypes";
import { Dimensions } from "../../../Domain";
import { IDimensionsService } from "../dimensionsService";


export default class DimensionsService extends BaseServiceType<DimensionsDBO, Dimensions> implements IDimensionsService {
  constructor({ unitOfWorkDI }: DI) {
    super({ unitOfWorkDI, repository: 'dimensionsRepository' });
  }

  async getDimensions({ }): Promise<Dimensions[] | null> {
    let result = await this.unitOfWorkDI.dimensionsRepository.getDimensions({})
    return result;
  }

}




export const DimensionsServicePlugin = {
  pluginName: "dimension-service",
  type: 'service',
  di: 'dimensionsServiceDI',
  classType: DimensionsService
} 
