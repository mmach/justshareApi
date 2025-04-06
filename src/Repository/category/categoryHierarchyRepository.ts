import { IBaseRepositoryType } from "../../Architecture";
import { CategoryHierarchyAttributesDBO } from "../../DBO";
import { CategoryHierarchy } from "../../Domain";



export interface ICategoryHierarchyRepository extends IBaseRepositoryType<CategoryHierarchyAttributesDBO, CategoryHierarchy> {
  removeParent({ id, transaction }: { id: string; transaction?: number }): Promise<number>;
}

