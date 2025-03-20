// @ts-nocheck

import { BaseDTO } from "justshare-shared";
import UnitOfWork from "../../unitOfWork.js";
import { AuthContextDTO } from "../../Dto/index.js";
import { Transaction } from "sequelize";

export class BaseServiceType<DTO, DAL> {

  unitOfWorkDI: UnitOfWork;
  repository: string;
  context: AuthContextDTO;

  constructor({ unitOfWorkDI, repository }: { unitOfWorkDI: UnitOfWork, repository: string }) {
    this.unitOfWorkDI = unitOfWorkDI;
    this.repository = repository;
    this.context = {
      user: {
        id: undefined,
        uid: undefined
      },
      project: {
        id: undefined
      }
    };
  }
  async toJsonParse(response: any) {
    let result = await response;
    const flattenDataValues = ({ dataValues }) => {
      const flattenedObject = {};

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
      ? result.map(flattenDataValues)
      : flattenDataValues(result);
  }
  get userId() {
    return this.context.user.id;
  }
  get projectId() {
    return this.context.project.id;

  }
  setContext(context: AuthContextDTO): BaseServiceType<DTO, DAL> {
    if (context) {
      this.context = context;
      this.unitOfWorkDI.setContext({ context });
    }
    return this;
  }

  /**
   *
   * @param  {{ id:number }}
   * @return {Promise<any>}
   * @memberof BaseService
   */
  async getById({ id, withProject }): Promise<DTO> {
    return await this.toJsonParse(this.unitOfWorkDI[this.repository].getById({ id, withProject })) as DTO;
  }

  /**
   *
   * @param  {{ id:number }}
   * @return {Promise<any>}
   * @memberof BaseService
   */
  async getByProject({ id }): Promise<DTO> {
    return await this.toJsonParse(this.unitOfWorkDI[this.repository].getByProject({})) as DTO;
  }


  /**
   *
   *
   * @param {*} { uid }
   * @returns
   * @memberof BaseService
   */
  async getByGuid({ uid, withProject }): Promise<DTO> {
    return await this.toJsonParse(this.unitOfWorkDI[this.repository].getByGuid({ uid, withProject })) as DTO;
  }
  /**
   *
   * @param  {{ model : BaseDTO }}
   * @return {Promise<any>}
   * @memberof BaseService
   */
  async insert({ model, withProject }): Promise<DTO> {
    return await this.toJsonParse(this.unitOfWorkDI[this.repository].insert({ model, withProject })) as DTO;
  }
  /**
   *
   * @param  {{ model : BaseDTO }}
   * @return {Promise<any>}
   * @memberof BaseService
   */
  async update({ model, withProject }): Promise<DAL> {
    return await this.unitOfWorkDI[this.repository].update({ model, withProject }) as DAL;
  }

  /**
     *
     * @param  {{ model : BaseDTO }}
     * @return {Promise<any>}
     * @memberof BaseService
     */
  async upsert({ model, withProject }): Promise<DAL> {
    return await this.unitOfWorkDI[this.repository].upsert({ model, withProject }) as DAL;

  }

  /**
   *
   * @param  {{ model : BaseDTO }}
   * @return {Promise<any>}
   * @memberof BaseService
   */
  async bulkInsert({ model, withProject }): Promise<DAL[]> {
    return await this.unitOfWorkDI[this.repository].bulkInsert({ model, withProject }) as DAL[];

  }
  /**
   *
   * @param  {{ model : BaseDTO }}
   * @return {Promise<any>}
   * @memberof BaseService
   */
  async delete({ model, withProject, transaction }: { model: DTO, withProject: boolean, transaction?: Transaction }): Promise {
    return await this.unitOfWorkDI[this.repository].delete({ model, withProject });
  }

  async deleteByGuid({ uid, withProject, transaction }: { model: DTO, withProject: boolean, transaction?: Transaction }): Promise {
    return await this.unitOfWorkDI[this.repository].deleteByGuid({ uid, withProject, transaction });
  }
}
