import { ICategoryActionsRepository } from "./categoryActionsRepository"
import { ICategoryHierarchyRepository } from "./categoryHierarchyRepository"
import { ICategoryOptionsRepository } from "./categoryOptionsRepository"
import { ICategoryRepository } from "./categoryRepository"

export type CATEGORY_REPOSITORY = {
    categoryActionsRepositoryDI: ICategoryActionsRepository,
    categoryHierarchyRepositoryDI: ICategoryHierarchyRepository,
    categoryOptionsRepositoryDI: ICategoryOptionsRepository,
    categoryRepositoryDI: ICategoryRepository
}