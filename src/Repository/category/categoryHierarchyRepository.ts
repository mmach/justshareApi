import { IBaseRepositoryType } from "../../Architecture";
import { CategoryHierarchyDBO } from "../../DBO";
import { CategoryHierarchy } from "../../Domain";



export interface ICategoryHierarchyRepository extends IBaseRepositoryType<CategoryHierarchyDBO, CategoryHierarchy> {
  removeParent({ id, transaction }: { id: string; transaction?: number }): Promise<number>;
}

