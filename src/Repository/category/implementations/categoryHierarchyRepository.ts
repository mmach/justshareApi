import { ICategoryHierarchyRepository } from "..";
import { BaseRepositoryType } from "../../../Architecture";
import { CategoryHierarchyDBO } from "../../../DBO";
import { CategoryHierarchy } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models.js";

export default class CategoryHierarchyRepository extends BaseRepositoryType<CategoryHierarchyDBO, CategoryHierarchy> implements ICategoryHierarchyRepository {
    sequelizeDI: IMappsDbModels
    constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
        super(sequelizeDI.CategoryHierarchy)
        this.sequelizeDI = sequelizeDI;

    }
    removeParent({ id, transaction }: { id: string, transaction?: number }): Promise<number> {
        return this.entityDAO.destroy({
            where: { category_child_id: this.toStr(id) },
            transaction: this.getTran({ transaction }),
            individualHooks: true
        });
    }

}


export const CategoryHierarchyRepositoryPlugin = {
    pluginName: "category-hierarchy-repository",
    type: 'repository',
    di: 'categoryHierarchyRepositoryDI',
    classType: CategoryHierarchyRepository
};