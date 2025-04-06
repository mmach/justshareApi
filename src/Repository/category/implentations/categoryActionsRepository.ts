import { ICategoryActionsRepository } from "..";
import { BaseRepositoryType, IBaseRepositoryType } from "../../../Architecture";
import { CategoryActionsDBO } from "../../../DBO";
import { CategoryActions } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";


export default class CategoryActionsRepository extends BaseRepositoryType<CategoryActionsDBO, CategoryActions> implements ICategoryActionsRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.CategoryActions);
    this.sequelizeDI = sequelizeDI;
  }
}


export const CategoryActionsRepositoryPlugin = {
  pluginName: "category-actions-repository",
  type: 'repository',
  di: 'categoryActionsRepositoryDI',
  classType: CategoryActionsRepository
};