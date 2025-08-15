import { IBaseServiceType } from "../../Architecture";
import { DimensionsDBO } from "../../DBO";
import { Dimensions } from "../../Domain";

export interface IDimensionsService extends IBaseServiceType<DimensionsDBO, Dimensions> {
  getDimensions(params: {}): Promise<Dimensions[] | null>;
}
