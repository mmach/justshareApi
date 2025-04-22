
import { Model } from "sequelize";
import { AuthContextDTO } from "../../Dto";
import UnitOfWork from "../../unitOfWork";
import { BaseDBO } from "./baseDBO";
import { IBaseRepositoryType } from "./baseRepositoryType";

export interface IBaseServiceType<DBO extends BaseDBO, DAL extends Model<any, any>> {
  setContext(context: AuthContextDTO): this;
  toJsonParse<T>(response: any): Promise<T | null>;
  getById({ id, withProject }: { id: string; withProject: boolean }): Promise<DBO>;
  getByProject({ }): Promise<DBO>;
  getByGuid({ uid, withProject }: { uid: string; withProject: boolean }): Promise<DBO>;
  insert({ model, withProject }: { model: Partial<DBO>; withProject: boolean }): Promise<DBO>;
  update({ model, withProject }: { model: Partial<DBO>; withProject: boolean }): Promise<DAL>;
  upsert({ model, withProject }: { model: Partial<DBO>; withProject: boolean }): Promise<DAL>;
  bulkInsert({ model, withProject }: { model: Partial<DBO>[]; withProject: boolean }): Promise<DAL[]>;
  delete({ model, withProject }: { model: Partial<DBO>, withProject: boolean }): Promise<number>;
  deleteByGuid({
    uid,
    withProject,
    transaction,
  }: {
    uid: string;
    withProject: boolean;
    transaction?: number;
  }): Promise<number>;
}
export class BaseServiceType<DBO extends BaseDBO, DAL extends Model<any, any>> implements IBaseServiceType<DBO, DAL> {

  unitOfWorkDI: UnitOfWork;
  repository: IBaseRepositoryType<DBO, DAL>;
  context: AuthContextDTO;

  constructor({ unitOfWorkDI, repository }: { unitOfWorkDI: UnitOfWork, repository: string }) {
    this.unitOfWorkDI = unitOfWorkDI;
    // @ts-ignore
    this.repository = unitOfWorkDI[repository];
    this.context = {
      user: {
        id: undefined,
        uid: undefined,
        email: undefined,
        is_admin: false,
        is_root: false,
      },
      project: {
        id: undefined
      },
      allowForAll: false,
      language: ''
    };
  }
  async toJsonParse<T>(response: any): Promise<T | null> {
    let result = await response;
    const flattenDataValues = ({ dataValues }: any) => {
      const flattenedObject: any = {};

      Object.keys(dataValues).forEach(key => {
        const dataValue = dataValues[key];

        if (
          Array.isArray(dataValue) &&
          dataValue[0] &&
          dataValue[0].dataValues &&
          typeof dataValue[0].dataValues === "object"
        ) {
          flattenedObject[key] = dataValues[key].map(flattenDataValues);
        } else if (
          dataValue &&
          dataValue.dataValues &&
          typeof dataValue.dataValues === "object"
        ) {
          flattenedObject[key] = flattenDataValues(dataValues[key]);
        } else {
          flattenedObject[key] = dataValues[key];
        }
      });

      return flattenedObject;
    };
    if (result == null) {
      return null;
    }
    return Array.isArray(result)
      ? result.map(flattenDataValues) as T
      : flattenDataValues(result);
  }
  get userId() {
    return this.context.user.id;
  }
  get projectId() {
    return this.context.project.id;

  }
  setContext(context: AuthContextDTO): this {
    if (context) {
      this.context = context;
      this.unitOfWorkDI.setContext({ context });
    }
    return this;
  }
  async getById({ id, withProject }: { id: string, withProject: boolean }): Promise<DBO> {
    return await this.toJsonParse(this.repository.getById({ id, withProject })) as DBO;
  }
  async getByProject({ }): Promise<DBO> {
    return await this.toJsonParse(this.repository.getByProject({})) as DBO;
  }

  async getByGuid({ uid, withProject }: { uid: string, withProject: boolean }): Promise<DBO> {
    return await this.toJsonParse(this.repository.getByGuid({ uid, withProject })) as DBO;
  }

  async insert({ model, withProject }: { model: Partial<DBO>, withProject: boolean }): Promise<DBO> {
    return await this.toJsonParse(this.repository.insert({ model, withProject })) as DBO;
  }

  async update({ model, withProject }: { model: Partial<DBO>, withProject: boolean }): Promise<DAL> {
    return await this.repository.update({ model, withProject }) as DAL;
  }

  async upsert({ model, withProject }: { model: Partial<DBO>, withProject: boolean }): Promise<DAL> {
    return await this.repository.upsert({ model, withProject }) as DAL;

  }

  async bulkInsert({ model, withProject }: { model: Partial<DBO>[], withProject: boolean }): Promise<DAL[]> {
    return await this.repository.bulkInsert({ model, withProject }) as DAL[];

  }

  async delete({ model, withProject }: { model: Partial<DBO>, withProject: boolean }): Promise<number> {
    return await this.repository.delete({ model, withProject });
  }

  async deleteByGuid({ uid, withProject, transaction }: { uid: string, withProject: boolean, transaction?: number }): Promise<number> {
    return await this.repository.deleteByGuid({ uid, withProject, transaction });
  }
}

