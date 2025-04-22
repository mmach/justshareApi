import { IBaseRepositoryType } from "../../Architecture";
import { CategoryDBO, CategoryActionsDBO, V_CategoryDBO } from "../../DBO";
import { Category, CategoryActions, V_Category } from "../../Domain";



export interface ICategoryRepository extends IBaseRepositoryType<CategoryDBO, Category> {
  deleteAction({ model, transaction }: { model: CategoryActionsDBO; transaction?: number }): Promise<number>;
  insertAction({ model, transaction }: { model: CategoryActionsDBO; transaction?: number }): Promise<CategoryActions>;
  getAllCategoriesFlat({ model, transaction }: { model: CategoryDBO; transaction?: number }): Promise<object[]>;
  updateIcon({ category_id, old_icon_id, new_icon_id, transaction }: { category_id?: string, old_icon_id?: string[], new_icon_id: string, transaction?: number }): Promise<[affectedCount: number]> | undefined
  getAllActions({ ids, transaction }: { ids: string[]; transaction?: number }): Promise<CategoryActions[]>;
  getCategoryTree({ ids, parent, transaction }: { ids: string[]; parent?: string; transaction?: number }): Promise<V_Category[]>;
  removeCategory({ id, transaction }: { id: string; transaction?: number }): Promise<number>;
  setAsVerified({ id, status, transaction }: { id: string; status: number; transaction?: number }): Promise<[affectedCount: number]>;
  getCategoryRelated({ id, transaction }: { id: string; transaction?: number }): Promise<V_CategoryDBO[]>;
  getCategoriesParents({ ids, transaction }: { ids: string[]; transaction?: number }): Promise<V_CategoryDBO[]>;
  getCategoryFreetext({ search, transaction }: { search: string; transaction?: number }): Promise<object[]>;
}
