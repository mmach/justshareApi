import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for CategoryHierarchy attributes
 */
export interface CategoryHierarchyAttributesDBO extends BaseDBO {
  id: string;
  category_child_id?: string;
  category_parent_id?: string;
}
