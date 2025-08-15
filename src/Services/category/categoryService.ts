import { V_CategoryDBO, CategoryActionsDBO, CategoryDBO } from "../../DBO";

export interface ICategoryService {
  getCategoryTree(params: { id: string; parent?: string }): Promise<V_CategoryDBO[] | null>;
  getCategoryActions(params: { category_id: string[] }): Promise<any[]>;
  insertAction(params: { model: CategoryActionsDBO }): Promise<CategoryActionsDBO | null>;
  deleteAction(params: { model: CategoryActionsDBO }): Promise<number>;
  getCategoryFreetext(params: { search: string }): Promise<object[]>;
  getAllCategoriesFlat(params: { model: CategoryDBO }): Promise<object[]>;
  getCategoryFreetextCategory(params: { model: CategoryDBO }): Promise<object[]>;
  newCategory(params: { model: CategoryDBO & { CategoryHierarchy: any } }): Promise<CategoryDBO | null>;
  removeCategory(params: { id: string }): Promise<number>;
  getCategoriesParents(params: { ids: string[] }): Promise<CategoryDBO[]>;
  setAsVerified(params: { id: string; status: number | undefined }): Promise<object[]>;
  setParent(params: { id: string; status: number; idParent: string | undefined }): Promise<void>;
}