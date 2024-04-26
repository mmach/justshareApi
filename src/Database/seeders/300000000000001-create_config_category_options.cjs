'use strict';


let fs = require('fs');


let Promise = require('bluebird');
let readline = require('readline')
const v4 = require("uuid").v4;


// create instance of readline
// each instance is associated with single input stream



// event is emitted after each line

let save = async (queryInterface, category, template) => {
  let result = await queryInterface.sequelize.query(`SELECT * FROM CategoryOptionsTypes WHERE name='${category.name}'`);
  if (result[0].length == 0) {
    await queryInterface.bulkInsert('CategoryOptionsTypes', [category]);
  }
  result = await queryInterface.sequelize.query(`SELECT * FROM CategoryOptionsTypes WHERE name='${category.name}'`);

  let mapPromises = template.map(async item => {

    let check = await queryInterface.sequelize.query(`SELECT * FROM CategoryOptionsTypeTemplates WHERE cot_id='${result[0][0].id}' AND [order]=${item.order}`);
    if (check[0].length == 0) {
      item.cot_id = result[0][0].id
      return await queryInterface.bulkInsert('CategoryOptionsTypeTemplates', [item]);

    } else {
      return new Promise((res, rej) => {
        res();
      });
    }
  })
  return await Promise.all(mapPromises)
}
module.exports = {
  up: async (queryInterface, Sequelize) => {

    let date = new Date().toISOString()
    let id = v4();
    let category = {
      id: id,
      name: "NUMBER",
      type: "SINGLE",
      status: true,
      created_at: date,
      updated_at: date

    };

    let template = [{
      id: v4(),
      cot_id: id,
      type: "long",
      status: true,
      order: 1,
      created_at: date,
      updated_at: date

    }];
    await save(queryInterface, category, template);

    //await queryInterface.bulkInsert('CategoryOptionsType', [category]);
    //await queryInterface.bulkInsert('CategoryOptionsTypeTemplate', [template]);

    id = v4();
    category = {
      id: id,
      name: "FLOAT",
      type: "SINGLE",
      status: 1,
      created_at: date,
      updated_at: date,


    }
    template = [{
      id: v4(),
      cot_id: id,
      type: "float",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);

    id = v4();
    category = {
      id: id,
      name: "DATE",
      type: "SINGLE",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: v4(),
      cot_id: id,
      type: "datetime",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);


    id = v4();
    category = {
      id: id,
      name: "STRING",
      type: "SINGLE",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: v4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);

    id = v4();
    category = {
      id: id,
      name: "BOOLEAN",
      type: "SINGLE",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: v4(),
      cot_id: id,
      type: "bit",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);


    id = v4();
    category = {
      id: id,
      name: "BETWEEN NUMBERS",
      type: "BETWEEN",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: v4(),
      cot_id: id,
      type: "long",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }, {
      id: v4(),
      cot_id: id,
      type: "long",
      status: 1,
      order: "2",
      created_at: date,
      updated_at: date

    }]

    await save(queryInterface, category, template);

    id = v4();
    category = {
      id: id,
      name: "BETWEEN FLOAT",
      type: "BETWEEN",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: v4(),
      cot_id: id,
      type: "float",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }, {
      id: v4(),
      cot_id: id,
      type: "float",
      status: 1,
      order: "2",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);

    id = v4();
    category = {
      id: id,
      name: "SELECT NUMBERS",
      type: "SELECT",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: v4(),
      cot_id: id,
      type: "long",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }]

    await save(queryInterface, category, template);

    id = v4();
    category = {
      id: id,
      name: "SELECT VARCHARS",
      type: "SELECT",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: v4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);



    id = v4();
    category = {
      id: id,
      name: "MULTISELECT VARCHARS",
      type: "MULTI_SELECT",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: v4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);

    id = v4();
    category = {
      id: id,
      name: "MULTISELECT NUMBER",
      type: "MULTI_SELECT",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: v4(),
      cot_id: id,
      type: "float",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);





    id = v4();
    category = {
      id: id,
      name: "BETWEEN DATE",
      type: "BETWEEN",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: v4(),
      cot_id: id,
      type: "datetime",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }, {
      id: v4(),
      cot_id: id,
      type: "datetime",
      status: 1,
      order: "2",
      created_at: date,
      updated_at: date

    }]


    id = v4();
    category = {
      id: id,
      name: "NOT BETWEEN DATE",
      type: "NOT_BETWEEN",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: v4(),
      cot_id: id,
      type: "datetime",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }, {
      id: v4(),
      cot_id: id,
      type: "datetime",
      status: 1,
      order: "2",
      created_at: date,
      updated_at: date

    }]

    await save(queryInterface, category, template);

    id = v4();
    category = {
      id: id,
      name: "FUNC LONG",
      type: "FUNC",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: v4(),
      cot_id: id,
      type: "long",
      is_func: 1,
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);

    id = v4();
    category = {
      id: id,
      name: "FUNC FLOAT",
      type: "FUNC",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: v4(),
      cot_id: id,
      type: "float",
      is_func: 1,
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);


    id = v4();
    category = {
      id: id,
      name: "URL_SINGLE",
      type: "URL",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [
      {
        id: v4(),
        cot_id: id,
        type: "nvarchar",
        is_func: 0,
        status: 1,
        order: "1",
        created_at: date,
        updated_at: date

      },
      {
        id: v4(),
        cot_id: id,
        type: "nvarchar",
        is_func: 0,
        status: 1,
        order: "2",
        created_at: date,
        updated_at: date

      }
      ,
      {
        id: v4(),
        cot_id: id,
        type: "bit",
        is_func: 0,
        status: 1,
        order: "3",
        created_at: date,
        updated_at: date

      }
      ,
      {
        id: v4(),
        cot_id: id,
        type: "nvarchar",
        is_func: 0,
        status: 1,
        order: "4",
        created_at: date,
        updated_at: date

      }
      ,
      {
        id: v4(),
        cot_id: id,
        type: "nvarchar",
        is_func: 1,
        status: 1,
        order: "5",
        created_at: date,
        updated_at: date

      }]
    await save(queryInterface, category, template);


    id = v4();
    category = {
      id: id,
      name: "URL_ARRAY",
      type: "URL",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [
      {
        id: v4(),
        cot_id: id,
        type: "nvarchar",
        is_func: 0,
        status: 1,
        order: "1",
        created_at: date,
        updated_at: date

      },
      {
        id: v4(),
        cot_id: id,
        type: "nvarchar",
        is_func: 0,
        status: 1,
        order: "2",
        created_at: date,
        updated_at: date

      }
      ,
      {
        id: v4(),
        cot_id: id,
        type: "bit",
        is_func: 0,
        status: 1,
        order: "3",
        created_at: date,
        updated_at: date
      }
      ,
      {
        id: v4(),
        cot_id: id,
        type: "nvarchar",
        is_func: 0,
        status: 1,
        order: "4",
        created_at: date,
        updated_at: date

      }
      ,
      {
        id: v4(),
        cot_id: id,
        type: "nvarchar",
        is_func: 1,
        status: 1,
        order: "5",
        created_at: date,
        updated_at: date

      }]
    await save(queryInterface, category, template);



    id = v4();
    category = {
      id: id,
      name: "GEOCOORDINATE",
      type: "GEOCOORDINATE",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: v4(),
      cot_id: id,
      type: "float",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }, {
      id: v4(),
      cot_id: id,
      type: "float",
      status: 1,
      order: "2",
      created_at: date,
      updated_at: date

    },
      , {
      id: v4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "3",
      created_at: date,
      updated_at: date

    }
      , {
      id: v4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "4",
      created_at: date,
      updated_at: date

    }
      , {
      id: v4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "5",
      created_at: date,
      updated_at: date

    },
    {
      id: v4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "6",
      created_at: date,
      updated_at: date

    },
    {
      id: v4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "7",
      created_at: date,
      updated_at: date

    },
  {
      id: v4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "8",
      created_at: date,
      updated_at: date

    },
  {
      id: v4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "9",
      created_at: date,
      updated_at: date

    },
    {
      id: v4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "10",
      created_at: date,
      updated_at: date

    },
    {
      id: v4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "11",
      created_at: date,
      updated_at: date

    },
    {
      id: v4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "12",
      created_at: date,
      updated_at: date

    },
    {
      id: v4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "13",
      created_at: date,
      updated_at: date

    },
    {
      id: v4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "14",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);

    id = v4();
    category = {
      id: id,
      name: "IMAGE",
      type: "IMAGE",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: v4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }, {
      id: v4(),
      cot_id: id,
      type: "bit",
      status: 1,
      order: "2",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);

    id = v4();
    category = {
      id: id,
      name: "IMAGES_BOUNCE",
      type: "IMAGES_BOUNCE",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: v4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }, {
      id: v4(),
      cot_id: id,
      type: "float",
      status: 1,
      order: "2",
      created_at: date,
      updated_at: date

    },
    {
      id: v4(),
      cot_id: id,
      type: "float",
      status: 1,
      order: "3",
      created_at: date,
      updated_at: date

    },
    {
      id: v4(),
      cot_id: id,
      type: "float",
      status: 1,
      order: "4",
      created_at: date,
      updated_at: date

    },
    {
      id: v4(),
      cot_id: id,
      type: "float",
      status: 1,
      order: "5",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);



    id = v4();
    category = {
      id: id,
      name: "SINGLE_DEPENDENCY",
      type: "SINGLE_DEPENDENCY_FLOAT",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: v4(),
      cot_id: id,
      type: "float",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }, {
      id: v4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "2",
      created_at: date,
      updated_at: date

    }
    , {
      id: v4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "3",
      created_at: date,
      updated_at: date

    }]

    await save(queryInterface, category, template);

    id = v4();
    category = {
      id: id,
      name: "CASE",
      type: "CASE_NUMBER",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: v4(),
      cot_id: id,
      type: "long",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }]

    await save(queryInterface, category, template);




  },

  down: (queryInterface, Sequelize) => {
    //return //queryInterface.bulkDelete('Continents', null, {});
  }
};
