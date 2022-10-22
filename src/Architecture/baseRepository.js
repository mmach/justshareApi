// @ts-nocheck

import { BaseDTO } from "justshare-shared";
import {v4} from "uuid";

/**
 *
 * @export
 * @class BaseRepository
 */
export default class BaseRepository {
  /**
   * Creates an instance of BaseRepository.
   * @param  {import ('sequelize').Model} entityDAO
   * @memberof BaseRepository
   */

  constructor(entityDAO) {
    this.entityDAO = entityDAO;
    this.transaction = 0;
    this.context = {
      language: '',
      user: {
        id: 0,
        uid: undefined
      },
      project: {
        id: undefined
      }
    };
  }
  toStr(val) {
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
  setContext({ context }) {
    if (context) {
      this.context = context;
    }
    return this;
  }

  async setTransaction({ transaction }) {
    this.transaction = transaction;
  }

  getTran({ transaction }) {
    if (transaction != null) {
      return transaction;
    } else if (this.transaction != 0) {
      return this.transaction;
    }
    return null;
  }
  /**
   *
   * @param  {{ id : number}}
   * @return {Promise<any>}
   * @memberof BaseRepository
   */
  // @ts-ignore
  getById({ id, withProject, transaction }) {
    let db = this.entityDAO;
    let where = { id: this.toStr(id) }
    if (withProject) {
      where.project_id = this.context.project.id
    }

    return db.findOne(
      {
        where: where,
        transaction: this.getTran({ transaction })
      },

    );
  }
  // @ts-ignore
  getByProject({ transaction }) {
    let db = this.entityDAO;
    let where = {}
    where.project_id = this.context.project.id


    return db.findAll(
      { where: where },
      { transaction: this.getTran({ transaction }) }
    );
  }

  /**
   *
   *
   * @param {{uid:any  }}
   * @returns
   * @memberof BaseRepository
   */
  getByGuid({ uid, withProject, transaction }) {
    let where = { uid: this.toStr(uid) }
    if (withProject) {
      where.project_id = this.context.project.id
    }

    return this.entityDAO.findOne({
      where: where,
      transaction: this.getTran({ transaction })
    });
  }
  deleteByGuid({ uid, withProject, transaction }) {
    let where = { uid: this.toStr(uid) }
    if (withProject) {
      where.project_id = this.context.project.id
    }
    return this.entityDAO.destroy({
      where: where,
      transaction: this.getTran({ transaction })
    });
  }
  /**
   *
   * @param  {{ model : BaseDTO }}
   * @return {Promise<any>}
   * @memberof BaseRepository
   */
  // @ts-ignore
  insert({ model, withProject, transaction }) {
    let item = model;
    if (!model.id) {
      item.id = v4();
    }
    if (withProject) {
      item.project_id = this.context.project.id;
    }
    return this.entityDAO.create(item, {
      transaction: this.getTran({ transaction }),
      returning: true,
      individualHooks: true,
      plain: true
    });
  }
  bulkInsert({ model, withProject, transaction }) {
    let item = model;
    item = item.map(i => {
      return {
        ...i,
        id: i.id ? i.id : v4(),
        project_id: withProject ? this.context.project.id : undefined
      }
    })

    return this.entityDAO.bulkCreate(item, {
      transaction: this.getTran({ transaction }),
      returning: true,
      individualHooks: true,
      plain: true
    });
  }
  /**
   *
   * @param  {{ model : BaseDTO}}
   * @return {Promise<any>}
   * @memberof BaseRepository
   */
  // @ts-ignore
  update({ model, withProject, transaction }) {
    let where = { id: this.toStr(model.id) }
    if (withProject) {
      where.project_id = this.context.project.id
    }
    return this.entityDAO.update(model, {
      where: where,
      transaction: this.getTran({ transaction }),

      individualHooks: true
    });
  }

  /**
   *
   * @param  {{ model : BaseDTO}}
   * @return {Promise<any>}
   * @memberof BaseRepository
   */
  // @ts-ignore
  upsert({ model, withProject, transaction }) {
    let item = { ...model };
    if (withProject) {
      item.project_id = this.context.project.id
    }

    return this.entityDAO.upsert(item, {

      transaction: this.getTran({ transaction }),
      returning: true,
      individualHooks: true,
      plain: true
    });
  }

  /**
   *
   * @param  {{ model : BaseDTO }}
   * @return {Promise<any>}
   * @memberof BaseRepository
   */
  // @ts-ignore
  delete({ model, withProject, transaction }) {
    let where = { id: this.toStr(model.id) }
    if (withProject) {
      where.project_id = this.context.project.id
    }
    return this.entityDAO.destroy({
      where: where,
      transaction: this.getTran({ transaction }),
      returning: true,
      individualHooks: true,
      plain: true
    });
  }


  /**
    *
    * @param  {{ model : BaseDTO }}
    * @return {Promise<any>}
    * @memberof BaseRepository
    */
  deleteByUserId({ user_id, withProject, transaction }) {
    let where = { user_id: this.toStr(user_id), project_id: this.context.project.id }

    return this.entityDAO.destroy({
      where: where,
      transaction: this.getTran({ transaction }),
      returning: true,
      individualHooks: true,
      plain: true
    });


  }
}
