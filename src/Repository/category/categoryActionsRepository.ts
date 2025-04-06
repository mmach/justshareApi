import { IBaseRepositoryType } from "../../Architecture";
import { CategoryActionsDBO } from "../../DBO";
import { CategoryActions } from "../../Domain";


export interface ICategoryActionsRepository extends IBaseRepositoryType<CategoryActionsDBO, CategoryActions> {}

