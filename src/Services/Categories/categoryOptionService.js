import CategoryOptionsRepository from "../../Repository/category/implementations/categoryOptionsRepository.js";
import {BaseService} from "../../Architecture/Base/baseService";
import UnitOfWork from "../../unitOfWork.js";


/*
 *
 * @export
 * @class BlobService
 * @extends BaseService
 */
export default class CategoryOptionService extends BaseService {
    /**
     * Creates an instance of UserService.
     * @param   {{ unitOfWorkDI: UnitOfWork, categoryOptionsRepositoryDI:CategoryOptionsRepository}}
     */
    constructor({ unitOfWorkDI }) {
        super({ unitOfWorkDI, repository: 'categoryOptionsRepository' });
    }

    async getType({ }) {
        return await this.unitOfWorkDI.categoryOptionsRepository.getTypes({})
    }
    async getRelatedOptions({category_ids})
    {
        return await this.toJsonParse( this.unitOfWorkDI.categoryOptionsRepository.getRelatedOptions({category_ids}))

    }
    async upsertTemplate({model})
    {
        return await this.unitOfWorkDI.categoryOptionsRepository.upsertTemplate({model})

    }
    async deleteTemplate({model})
    {
        return await this.unitOfWorkDI.categoryOptionsRepository.deleteTemplate({model})

    }
    
    async upsertToCategory({model})
    {
        return await this.unitOfWorkDI.categoryOptionsRepository.upsertToCategory({model})

    }
    async getAllCategoriesOption({id})
    {
        return await this.unitOfWorkDI.categoryOptionsRepository.getAllCategoriesOption({id})

    }
    async getCategoryLinkQuery({id})
    {
        return await this.unitOfWorkDI.categoryOptionsRepository.getCategoryLinkQuery({id})

    }
  
    async removeCategoryOptionsForCategory({id})
    {
        return await this.unitOfWorkDI.categoryOptionsRepository.removeCategoryOptionsForCategory({id})

    }

    
}


export const CategoryOptionServicePlugin = {
  pluginName: "category-options-service",
  type: 'service',
  di: 'categoryOptionServiceDI',
  classType: CategoryOptionService
} 
