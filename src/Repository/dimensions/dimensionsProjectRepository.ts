import { IBaseRepositoryType } from "../../Architecture";
import { DimensionsProjectDBO } from "../../DBO";
import { DimensionsProject } from "../../Domain";



export interface IDimensionsProjectRepository extends IBaseRepositoryType<DimensionsProjectDBO, DimensionsProject> {
  getDimensions({ transaction }: { transaction?: number }): Promise<DimensionsProject[]>;
}
