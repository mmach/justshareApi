// @ts-nocheck
import UnitOfWork from "../unitOfWork.js";
import BaseRepository from "./baseRepository.js";
import ServerException from "./Exceptions/serverException.js";
import { BaseDTO } from "justshare-shared";

/**
 *
 * @export
 * @class BaseService
 */
export default class BaseService {
  /**
   * Creates an instance of BaseService.
   * @param  {{ unitOfWorkDI : UnitOfWork, repository:BaseRepository }}
   * @memberof BaseService
   */
  constructor({ unitOfWorkDI, repository }) {
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
  async toJsonParse(response) {
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
  setContext(context) {
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
  async getById({ id, withProject }) {
    return await this.toJsonParse(this.unitOfWorkDI[this.repository].getById({ id, withProject }));
  }

  /**
   *
   * @param  {{ id:number }}
   * @return {Promise<any>}
   * @memberof BaseService
   */
  async getByProject({ id }) {
    return await this.toJsonParse(this.unitOfWorkDI[this.repository].getByProject({}));
  }


  /**
   *
   *
   * @param {*} { uid }
   * @returns
   * @memberof BaseService
   */
  async getByGuid({ uid, withProject }) {
    return await this.toJsonParse(this.unitOfWorkDI[this.repository].getByGuid({ uid, withProject }));
  }
  /**
   *
   * @param  {{ model : BaseDTO }}
   * @return {Promise<any>}
   * @memberof BaseService
   */
  async insert({ model, withProject }) {
    return await this.toJsonParse(this.unitOfWorkDI[this.repository].insert({ model, withProject }));
  }
  /**
   *
   * @param  {{ model : BaseDTO }}
   * @return {Promise<any>}
   * @memberof BaseService
   */
  async update({ model, withProject }) {
    return await this.unitOfWorkDI[this.repository].update({ model, withProject });
  }

  /**
     *
     * @param  {{ model : BaseDTO }}
     * @return {Promise<any>}
     * @memberof BaseService
     */
  async upsert({ model, withProject }) {
    return await this.unitOfWorkDI[this.repository].upsert({ model, withProject });

  }
  /**
   *
   * @param  {{ model : BaseDTO }}
   * @return {Promise<any>}
   * @memberof BaseService
   */
  async delete({ model, withProject }) {
    return await this.unitOfWorkDI[this.repository].delete({ model, withProject });
  }

  async deleteByGuid({ uid, withProject, transaction }) {
    return await this.unitOfWorkDI[this.repository].deleteByGuid({ uid, withProject });
  }
}
