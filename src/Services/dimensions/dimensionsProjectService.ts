import { IBaseServiceType } from "../../Architecture";
import { DimensionsProjectDBO } from "../../DBO";
import { DimensionsProject } from "../../Domain";

export interface IDimensionsProjectService extends IBaseServiceType<DimensionsProjectDBO, DimensionsProject> {
  getDimensions(params: {}): Promise<DimensionsProjectDBO[] | null>;
  getDimensionsFlat(params: {}): Promise<DimensionsProjectDBO[] | null>;
}
