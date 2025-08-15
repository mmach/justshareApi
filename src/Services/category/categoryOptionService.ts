import { IBaseServiceType } from "../../Architecture";
import { CategoryOptionDBO, CategoryOptionsTemplateDBO, CategoryOptionsLinkDBO } from "../../DBO";
import { CategoryOption, CategoryOptionsLink } from "../../Domain";

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
