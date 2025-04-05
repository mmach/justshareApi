
import { Attributes, Model, ModelStatic, WhereOptions } from "sequelize";
import { v4 } from "uuid";
import { BaseDBO } from "./baseDBO";
import { AuthContextDTO } from "../../Dto";


export interface IBaseRepositoryType<T extends BaseDBO, DAL extends Model> {
  setContext(context: { context: any }): this;
  setTransaction(transaction: { transaction: number }): void;
  getTran(transaction: { transaction?: number }): number | null;
  getById(params: { id: string | number; withProject?: boolean; transaction?: number }): Promise<DAL | null>;
  getByProject(params: { transaction?: number }): Promise<DAL[]>;
  getByGuid(params: { uid: string | number; withProject?: boolean; transaction?: number }): Promise<DAL | null>;
  deleteByGuid(params: { uid: string | number; withProject?: boolean; transaction?: number }): Promise<number>;
  insert(params: { model: T; withProject?: boolean; transaction?: number }): Promise<DAL>;
  bulkInsert(params: { model: T[]; withProject?: boolean; transaction?: number }): Promise<DAL[]>;
  update(params: { model: T; withProject?: boolean; transaction?: number }): any;
  upsert(params: { model: T; withProject?: boolean; transaction?: number }): any;
  delete(params: { model: T; withProject?: boolean; transaction?: number }): Promise<number>;
  deleteByUserId(params: { user_id: string | number; withProject?: boolean; transaction?: number }): Promise<number>;
}

export class BaseRepositoryType<T extends BaseDBO, DAL extends Model> implements IBaseRepositoryType<T, DAL> {
  entityDAO: ModelStatic<DAL>;
  transaction: number;
  context: AuthContextDTO;
  constructor(entityDAO: ModelStatic<DAL>) {
    this.entityDAO = entityDAO;
    this.transaction = 0;
    this.context = {
      language: '',
      user: {
        id: undefined,
        uid: undefined
      },
      project: {
        id: undefined
      },
      allowForAll: undefined
    };
  }
  toStr(val: any): any {
    if (val == null) {
      return null;
    } else if (val == undefined) {
      return undefined;
    } else {
      return String(val);
    }
  }
  get userId() {
    return this.context.user.id
  }
  setContext({ context }: { context: AuthContextDTO }): this {
    if (context) {
      this.context = context;
    }
    return this;
  }

  setTransaction({ transaction }: { transaction: number }): void {
    this.transaction = transaction;
  }

  getTran({ transaction }: { transaction?: number }): any {
    if (transaction != null) {
      return transaction;
    } else if (this.transaction != 0) {
      return this.transaction;
    }
    return null;
  }

  getById({ id, withProject, transaction }: { id: string | number, withProject?: boolean, transaction?: number }): Promise<DAL | null> {
    let db = this.entityDAO;
    let where: Partial<WhereOptions<Attributes<DAL>> & { project_id?: string }> = { id: this.toStr(id)! as any }
    if (withProject) {
      where.project_id = this.context.project.id
    }

    return db.findOne(
      {
        where: where as WhereOptions<Attributes<DAL>>,
        transaction: this.getTran({ transaction }) as any
      },

    );
  }
  getByProject({ transaction }: { transaction?: number }): Promise<DAL[]> {
    let db = this.entityDAO;
    let where: Partial<WhereOptions<Attributes<DAL>> & { project_id?: string }> = {}
    where.project_id = this.context.project.id
    return db.findAll(
      {
        where: where as WhereOptions<Attributes<DAL>>,
        transaction: this.getTran({ transaction }) as any
      }
    );
  }

  getByGuid({ uid, withProject, transaction }: { uid: string | number, withProject?: boolean, transaction?: number }): Promise<DAL | null> {
    let where: Partial<WhereOptions<Attributes<DAL>> & { project_id?: string, uid: string }> = { uid: this.toStr(uid) as any }
    if (withProject) {
      where.project_id = this.context.project.id
    }

    return this.entityDAO.findOne({
      where: where as WhereOptions<Attributes<DAL>>,
      transaction: this.getTran({ transaction }) as any
    });
  }
  deleteByGuid({ uid, withProject, transaction }: { uid: string | number, withProject?: boolean, transaction?: number }): Promise<number> {
    let where: Partial<WhereOptions<Attributes<DAL>> & { project_id?: string, uid: string }> = { uid: this.toStr(uid) as any }
    if (withProject) {
      where.project_id = this.context.project.id
    }
    return this.entityDAO.destroy({
      where: where as WhereOptions<Attributes<DAL>>,
      transaction: this.getTran({ transaction }) as any
    });
  }
  insert({ model, withProject, transaction }: { model: T, withProject?: boolean, transaction?: number }): Promise<DAL> {
    let item: T & { project_id?: string } = model;
    if (!model.id) {
      item.id = v4();
    }
    if (withProject) {
      item.project_id = this.context.project.id;
    }
    return this.entityDAO.create(item as DAL["_creationAttributes"], {
      transaction: this.getTran({ transaction }) as any,
      returning: true,
      plain: true
    });
  }
  bulkInsert({ model, withProject, transaction }: { model: T[], withProject?: boolean, transaction?: number }): Promise<DAL[]> {
    let item = model;
    item = item.map(i => {
      return {
        ...i,
        id: i.id ? i.id : v4(),
        project_id: withProject ? this.context.project.id : undefined
      }
    })

    return this.entityDAO.bulkCreate(item as unknown as readonly DAL["_creationAttributes"][], {
      transaction: this.getTran({ transaction }) as any,
      returning: true,
      individualHooks: true,
    });
  }

  update({ model, withProject, transaction }: { model: T, withProject?: boolean, transaction?: number }): any {
    let where: Partial<WhereOptions<Attributes<DAL>> & { project_id?: string }> = { id: this.toStr(model.id) }
    if (withProject) {
      where.project_id = this.context.project.id
    }
    return this.entityDAO.update(model, {
      where: where as WhereOptions<Attributes<DAL>>,
      transaction: this.getTran({ transaction }) as any,
      individualHooks: true
    });
  }


  upsert({ model, withProject, transaction }: { model: T, withProject?: boolean, transaction?: number }): any {
    let item: T & { project_id?: string } = { ...model };
    if (withProject) {
      item.project_id = this.context.project.id
    }

    return this.entityDAO.upsert(item as DAL["_creationAttributes"], {
      transaction: this.getTran({ transaction }) as any,
      returning: true,
      hooks: true,
      //  individualHooks: true,
      //  plain: true
    });
  }

  delete({ model, withProject, transaction }: { model: T, withProject?: boolean, transaction?: number }) {
    let where: Partial<WhereOptions<Attributes<DAL>> & { project_id?: string }> = { id: this.toStr(model.id) }
    if (withProject) {
      where.project_id = this.context.project.id
    }
    return this.entityDAO.destroy({
      where: where as WhereOptions<Attributes<DAL>>,
      transaction: this.getTran({ transaction }) as any,
      //returning: true,
      individualHooks: true,
      //plain: true
    });
  }



  deleteByUserId({ user_id, withProject, transaction }: { user_id: string | number, withProject?: boolean, transaction?: number }): Promise<number> {
    let where = { user_id: this.toStr(user_id), project_id: this.context.project.id }

    return this.entityDAO.destroy({
      where: where,
      transaction: this.getTran({ transaction }) as any,
      //returning: true,
      individualHooks: true,
      //plain: true
    });


  }
}
