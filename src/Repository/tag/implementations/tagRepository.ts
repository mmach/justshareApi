import { BaseRepositoryType } from "../../../Architecture";
import { TagDBO } from "../../../DBO";
import { Tag } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { ITagRepository } from "../tagRepository";

export default class TagRepository extends BaseRepositoryType<TagDBO, Tag> implements ITagRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {

    super(sequelizeDI.Tag);
    this.sequelizeDI = sequelizeDI;
  }



  async insertUniq({ tag, id, transaction }: { tag: string, id: string, transaction?: number }): Promise<string> {
    let item = await this.entityDAO.findOne(
      {
        where: { tag: this.toStr(tag.trim()), project_id: this.context.project.id },
        transaction: this.getTran({ transaction })
      },

    );
    if (item != null) {
      return item.getDataValue('id')
    }

    this.insert({ model: { id: id, tag: tag, project_id: this.context.project.id }, withProject: true, transaction: transaction })
    return id;

  }
}

export const TagRepositoryPlugin = {
  pluginName: "tag-repository",
  type: 'repository',
  di: 'tagRepositoryDI',
  classType: TagRepository
};



