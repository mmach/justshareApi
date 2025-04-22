import { IBaseRepositoryType } from "../../Architecture";
import { DimensionsDBO } from "../../DBO";
import { Dimensions } from "../../Domain";

export interface IDimensionsRepository extends IBaseRepositoryType<DimensionsDBO, Dimensions> {
  getDimensions({ transaction }: { transaction?: number }): Promise<Dimensions[]>;
}
