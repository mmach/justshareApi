import { uuid } from "uuidv4";
import { BaseServiceType } from "../../../Architecture";
import { CategoryDBO, V_CategoryDBO, CategoryActionsDBO, CategoryHierarchyDBO } from "../../../DBO";
import { DI } from "../../../diTypes";
import { Category, CategoryActions } from "../../../Domain";
import { ICategoryService } from "../categoryService";


export default class CategoryService extends BaseServiceType<CategoryDBO, Category> implements ICategoryService {
  constructor({ unitOfWorkDI }: DI) {
    super({ unitOfWorkDI, repository: "categoryRepository" });
  }
  async getCategoryTree({ id, parent }: { id: string; parent?: string }): Promise<V_CategoryDBO[] | null> {
    return await this.toJsonParse<V_CategoryDBO[]>(
      this.unitOfWorkDI.categoryRepository.getCategoryTree({ ids: [id], parent: parent })
    );
  }
  async getCategoryActions({ category_id }: { category_id: string[] }): Promise<CategoryActions[]> {
    let categories = await this.getCategoriesParents({ ids: category_id })
    let ids = categories.map(item => { return item.id });
    return await this.unitOfWorkDI.categoryRepository.getAllActions({ ids: ids })
  }
  async insertAction({ model }: { model: CategoryActionsDBO }): Promise<CategoryActionsDBO | null> {
    return await this.toJsonParse<CategoryActionsDBO>(
      this.unitOfWorkDI.categoryRepository.insertAction({ model: model })
    );
  }
  async deleteAction({ model }: { model: CategoryActionsDBO }): Promise<number> {
    return await this.unitOfWorkDI.categoryRepository.deleteAction({ model: model })
  }
  async getCategoryFreetext({ search }: { search: string }): Promise<object[]> {
    let result = await this.unitOfWorkDI.categoryRepository.getCategoryFreetext({ search })
    return result;
  }

  async getAllCategoriesFlat({ model }: { model: CategoryDBO }): Promise<object[]> {
    let result = await this.unitOfWorkDI.categoryRepository.getAllCategoriesFlat({ model })
    return result;
  }

  async getCategoryFreetextCategory({ model }: { model: CategoryDBO }): Promise<object[]> {
    let result = await this.getCategoryFreetext({ search: model.translation?.name! });
    if (result.length > 0) {
      let ids = (result as { KEY: string }[]).map((item) => { return item.KEY });
      return await this.unitOfWorkDI.categoryRepository.getCategoryTree({ ids: ids })
    } else {
      return []
    }

  }
  //CHECK privileges , status , if user have access to this category
  async newCategory({ model }: { model: CategoryDBO & { CategoryHierarchy: CategoryHierarchyDBO } }): Promise<CategoryDBO | null> {
    // if (!this.context.user.is_admin) {
    //   model.status = 0;
    //}
    let result = await this.toJsonParse<CategoryDBO>(
      this.unitOfWorkDI.categoryRepository.insert({ model, withProject: true })
    );
    let obj: Partial<CategoryHierarchyDBO> = { id: uuid() };

    if (model.CategoryHierarchy && model.CategoryHierarchy.category_parent_id) {

      obj.category_parent_id = model.CategoryHierarchy.category_parent_id;
      obj.category_child_id = result!.id;

      await this.unitOfWorkDI.categoryHierarchyRepository.insert({
        model: obj
      });
    }
    return result;
  }

  async removeCategory({ id }: { id: string }): Promise<number> {
    let related = await this.unitOfWorkDI.categoryRepository.getCategoryRelated({ id: id });

    let idList = related.map(item => {
      return item.id;
    })
    return await this.unitOfWorkDI.categoryRepository.removeCategory({ id: idList });
  }

  async getCategoriesParents({ ids }: { ids: string[] }): Promise<CategoryDBO[]> {
    return await this.unitOfWorkDI.categoryRepository.getCategoriesParents({ ids: ids })
  }

  async setAsVerified({ id, status }: { id: string; status: number | undefined }): Promise<object[]> {
    let related = await this.unitOfWorkDI.categoryRepository.getCategoryRelated({ id: id });
    let promises = related.map(item => {
      return this.unitOfWorkDI.categoryRepository.setAsVerified({ id: item.id, status });
    })
    return await Promise.all(promises);
  }

  async setParent({ id, status, idParent }: { id: string; status: number; idParent: string | undefined }): Promise<void> {
    let parent: Partial<CategoryDBO> = {
      status: status
    }
    if (idParent != null) {
      parent = await this.getById({ id: idParent, withProject: true });
    }
    await this.setAsVerified({ id: id, status: parent.status });
    await this.unitOfWorkDI.categoryHierarchyRepository.removeParent({ id });
    await this.unitOfWorkDI.categoryHierarchyRepository.insert({ model: { category_child_id: id, category_parent_id: idParent } })

  }

}

export const CategoryServicePlugin = {
  pluginName: "category-service",
  type: "service",
  di: "categoryServiceDI",
  classType: CategoryService,
};