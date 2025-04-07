import { IBaseRepositoryType } from "../../Architecture";
import { CommentDBO } from "../../DBO";
import { Comment } from "../../Domain";

export interface ICommentRepository extends IBaseRepositoryType<CommentDBO, Comment> {
  getByIUA({ iua_id, transaction }: { iua_id: string; transaction?: number }): Promise<Comment[]>;
}
