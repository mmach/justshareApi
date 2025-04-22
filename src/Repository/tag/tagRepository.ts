import { IBaseRepositoryType } from "../../Architecture";
import { TagDBO } from "../../DBO";
import { Tag } from "../../Domain";


export interface ITagRepository extends IBaseRepositoryType<TagDBO, Tag> {
  insertUniq({ tag, id, transaction }: { tag: string; id: string; transaction?: number }): Promise<string>;
}
