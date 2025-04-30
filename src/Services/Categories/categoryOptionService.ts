import { BaseServiceType, IBaseServiceType } from "../../Architecture/index.js";
import { CategoryOptionDBO, CategoryOptionsLinkDBO, CategoryOptionsTemplateDBO } from "../../DBO/index.js";
import { DI } from "../../diTypes.js";
import { CategoryOption, CategoryOptionsLink } from "../../Domain/index.js";


export default class CategoryOptionService extends BaseServiceType<CategoryOptionDBO, CategoryOption> implements ICategoryOptionService {
    constructor({ unitOfWorkDI }: DI) {
        super({ unitOfWorkDI, repository: 'categoryOptionsRepository' });
    }

    async getType({ }: {}): Promise<CategoryOption[]> {
        return await this.unitOfWorkDI.categoryOptionsRepository.getTypes({})
    }
    async getRelatedOptions({ category_ids }: { category_ids: string[] }): Promise<CategoryOptionDBO[] | null> {
        return await this.toJsonParse<CategoryOptionDBO[]>(this.unitOfWorkDI.categoryOptionsRepository.getRelatedOptions({ category_ids }))

    }
    async upsertTemplate({ model }: { model: CategoryOptionsTemplateDBO }) {
        return await this.unitOfWorkDI.categoryOptionsRepository.upsertTemplate({ model })

    }
    async deleteTemplate({ model }: { model: CategoryOptionsTemplateDBO }): Promise<number> {
        return await this.unitOfWorkDI.categoryOptionsRepository.deleteTemplate({ model })
    }

    async upsertToCategory({ model }: { model: CategoryOptionsLinkDBO }): Promise<[CategoryOptionsLink, boolean | null]> {

        return await this.unitOfWorkDI.categoryOptionsRepository.upsertToCategory({ model })

    }
    async getAllCategoriesOption({ id }: { id: string }): Promise<CategoryOption[]> {
        return await this.unitOfWorkDI.categoryOptionsRepository.getAllCategoriesOption({ id })

    }
    async getCategoryLinkQuery({ id }: { id: string }): Promise<CategoryOptionsLink | null> {
        return await this.unitOfWorkDI.categoryOptionsRepository.getCategoryLinkQuery({ id })
    }

    async removeCategoryOptionsForCategory({ id }: { id: string }): Promise<number> {
        return await this.unitOfWorkDI.categoryOptionsRepository.removeCategoryOptionsForCategory({ id })

    }


}
export interface ICategoryOptionService extends IBaseServiceType<CategoryOptionDBO, CategoryOption> {
    getType({ }: {}): Promise<CategoryOption[]>;
    getRelatedOptions({ category_ids }: { category_ids: string[] }): Promise<CategoryOptionDBO[] | null>;
    upsertTemplate({ model }: { model: CategoryOptionsTemplateDBO }): Promise<any>;
    deleteTemplate({ model }: { model: CategoryOptionsTemplateDBO }): Promise<number>;
    upsertToCategory({ model }: { model: CategoryOptionsLinkDBO }): Promise<[CategoryOptionsLink, boolean | null]>;
    getAllCategoriesOption({ id }: { id: string }): Promise<CategoryOption[]>;
    getCategoryLinkQuery({ id }: { id: string }): Promise<CategoryOptionsLink | null>;
    removeCategoryOptionsForCategory({ id }: { id: string }): Promise<number>;
}


export const CategoryOptionServicePlugin = {
    pluginName: "category-options-service",
    type: 'service',
    di: 'categoryOptionServiceDI',
    classType: CategoryOptionService
} 
