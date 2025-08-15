import { BaseServiceType } from "../../../Architecture";
import { CategoryOptionDBO, CategoryOptionsTemplateDBO, CategoryOptionsLinkDBO } from "../../../DBO";
import { DI } from "../../../diTypes";
import { CategoryOption, CategoryOptionsLink } from "../../../Domain";
import { ICategoryOptionService } from "../categoryOptionService";


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


export const CategoryOptionServicePlugin = {
    pluginName: "category-options-service",
    type: 'service',
    di: 'categoryOptionServiceDI',
    classType: CategoryOptionService
} 
