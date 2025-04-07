import { BaseRepositoryType } from "../../../Architecture";
import { CommentDBO } from "../../../DBO";
import { Comment } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { ICommentRepository } from "../commentRepository";

export default class CommentRepository extends BaseRepositoryType<CommentDBO, Comment> implements ICommentRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.Comment);
    this.sequelizeDI = sequelizeDI;
  }

  async getByIUA({ iua_id, transaction }: { iua_id: string, transaction?: number }): Promise<Comment[]> {
    return this.entityDAO.findAll({
      where:
      {
        iua_id: iua_id,
        project_id: this.context.project.id
      },
      transaction: this.getTran({ transaction })
    })
  }

}

export const CommentRepositoryPlugin = {
  pluginName: "comment-repository",
  type: 'repository',
  di: 'commentRepositoryDI',
  classType: CommentRepository
};