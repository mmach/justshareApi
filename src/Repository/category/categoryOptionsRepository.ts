import { IBaseRepositoryType } from "../../Architecture";
import { CategoryOptionDBO, CategoryOptionsLinkDBO, CategoryOptionsTemplateDBO } from "../../DBO";
import { CategoryOption, CategoryOptionsLink, CategoryOptionsTemplate } from "../../Domain";

export interface ICategoryOptionsRepository extends IBaseRepositoryType<CategoryOptionDBO, CategoryOption> {
  getTypes({ transaction }: { transaction?: number }): Promise<CategoryOption[]>;
  getRelatedOptions({ category_ids, transaction }: { category_ids: string[]; transaction?: number }): Promise<CategoryOption[]>;
  upsertTemplate({ model, transaction }: { model: CategoryOptionsTemplateDBO, transaction?: number }): Promise<[CategoryOptionsTemplate, boolean | null]>;
  deleteTemplate({ model, transaction }: { model: CategoryOptionsTemplateDBO, transaction?: number }): Promise<number>
  upsertToCategory({ model, transaction }: { model: CategoryOptionsLinkDBO, transaction?: number }): Promise<[CategoryOptionsLink, boolean | null]>;
  getAllCategoriesOption({ id, transaction }: { id?: string; transaction?: number }): Promise<CategoryOption[]>;
  upsertCategoryOptionsForCategory({ model, transaction }: { model: CategoryOptionDBO; transaction?: number }): Promise<[CategoryOptionsLink, boolean | null]>;
  removeCategoryOptionsForCategory({ id, transaction }: { id: string; transaction?: number }): Promise<number>;
  getCategoryLinkQuery({ id, transaction }: { id: string; transaction?: number }): Promise<CategoryOptionsLink | null>;
}

