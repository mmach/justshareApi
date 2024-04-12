// @ts-nocheck

import BaseService from "../Architecture/baseService.js";
import UnitOfWork from "../unitOfWork.js";
import { UserRegisterInternalDTO } from "justshare-shared";

import CONFIG from "../config.js";
import axios from 'axios'

let value = `
def arrays = [];
for (a in states){
        for (b in a.value)
    {
            arrays.add(b)
    }
} 
def score_min = -1;
def score_max = 0;
def interval = 0.8;
def uniqValues = [];
def bucket = 40;
def size = 0;
def buckets=[];
for (el in arrays) {
        if (score_min == -1) {
            score_min = el
    } else if (el < score_min) {
            score_min = el
    }
}
for (el in arrays) {
        if (el > score_max) {
            score_max = el
    }
}
if (arrays.length < bucket) {
        bucket = arrays.length
}
if (bucket == 0) {
        bucket = -1;
}
interval = score_max - score_min;
interval = interval / bucket;
if (interval <= 0) {
        interval = -1
}

for (def i = 0; i < bucket; i++) {
        buckets.add([i, 0, score_min + (i * interval), score_min + ((1 + i) * interval)])
}
buckets.add([buckets.length, 0, score_max, score_max + interval]);
for (def i = 0; i < arrays.length; i++) {
        for (def y = 0; y < buckets.length; y++) {
            if (buckets[y][2] <= arrays[i] && buckets[y][3] > arrays[i]) {
                buckets[y][1]++;
            break;
        }
    }
}
return buckets`
value = value.replace(/\n/g, '');
value = value.replace(/\r/g, '');
value = value.replace(String.fromCharCode(10), '');

let scriptAgg = value



let value2 = `
            def score_min = -1;
            def score_max = 0;
            def interval = 0.8;
            def uniqValues = [];
            def bucket = 40;
            def size = 0;
            for (el in state.value) {
                if (score_min == -1) {
                    score_min = el
                } else if (el < score_min) {
                    score_min = el
                }
            }
            for (el in state.value) {
                if (el > score_max) {
                    score_max = el
                }
            }
            state.buckets = [];
            state.size = state.value.length;
            if (state.size < bucket) {
                bucket = state.size
            }
            if (bucket == 0) {
                bucket = -1;
            }
            interval = score_max - score_min;
            interval = interval / bucket;
            if (interval <= 0) {
                interval = -1
            }
            state.score_min = score_min;
            state.interval = interval;

            state.score_max = score_max;
            for (def i = 0; i < bucket; i++) {
                state.buckets.add([i, 0, state.score_min + (i * state.interval), state.score_min + ((1 + i) * state.interval)])
            }
            state.buckets.add([state.buckets.length, 0, score_max, score_max + interval]);
            for (def i = 0; i < state.value.length; i++) {
                for (def y = 0; y < state.buckets.length; y++) {
                    if (state.buckets[y][2] <= state.value[i] && state.buckets[y][3] > state.value[i]) {
                        state.buckets[y][1]++;
                        break;
                    }
                }
            }
            return state`

value2 = value2.replace(/\n/g, '');
value2 = value2.replace(/\r/g, '');
value2 = value2.replace(String.fromCharCode(10), '');

let scriptDeppAgg = value2


/**
 *
 * @export
 * @class UserService
 * @extends BaseService
 */
export default class ElasticSearchService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork}}
   */
  constructor({ unitOfWorkDI, itemRepositoryDI, itemServiceDI, categoryServiceDI }) {
    super({ unitOfWorkDI });
    this.itemRepositoryDI = itemRepositoryDI;
    this.itemServiceDI = itemServiceDI;
    this.categoryServiceDI = categoryServiceDI
  }
  /**
     * 
     * @param {{ model: UserRegisterInternalDTO}}
     * @return {Promise<any>}
   
     */

  async upsertItemDoc({ item_id,
    clobs,
    longitude,
    latitude,
    user_id,
    catOptions,
    description,
    title,
    tags,
    status,
    type,
    category, categories, createdAt, expired_at, item }) {
    //console.log(JSON.stringify(catOptions, true))

    let singleGeo = catOptions.filter(item => {
      return item.type == 'SINGLE'
    }).map(item => {
      var value = {};
      // value[item.catOption.cat_opt_type_template.type] = ['float', 'long'].includes(item.catOption.cat_opt_type_template.type) ? parseFloat(item.val) : item.val
      value = item.val;
      value = ['float', 'date', 'text', 'long'].map(item => {
        return {}[item] = item.val;
      })
      return {
        cat_opt_id: item.cat_opt_id,
        type: item.type,
        dataType: item.catOption.cat_opt_type_template.type,
        order: item.catOption.cat_opt_type_template.order,
        cat_opt_temp_id: item.catOption.id,
        co_id: item.co_id,
        value: {
          float: parseFloat(item.val),
          date: Date.parse(item.val),
          text: item.val,
          long: parseInt(item.val)

        }
        // conc: item.cat_opt_id + ";" + String(value)
      }

    })

    let singleSELECT = catOptions.filter(item => {
      return ['SELECT', 'MULTI_SELECT'].includes(item.type)
    }).map(item => {
      var value = {};
      value = {
        ...item.select.value_translation,
      }
      return {

        cat_opt_id: item.cat_opt_id,
        type: item.type,
        dataType: item.select.cat_opt_type_template.type,
        order: item.select.cat_opt_type_template.order,
        cat_opt_temp_id: item.select.id,
        co_id: item.co_id,
        value: value
      }

    })

    let categoriesArray = categories.map(item => {
      return {
        id: item.id, category: { ...item.translation }
      }
    });
    // console.log(tags);
    let data = {
      "location": [longitude, latitude],
      "user_id": user_id,
      "title": title,
      "description": description,
      "clob": clobs,
      "status": status,
      "created_at": createdAt,
      "expired_at": expired_at,
      "tags": tags.map(item => {
        return {
          tag: item.label
        }
      }),
      "tagsArray": tags.map(item => {
        return { tag: item.label }
      }),
      "single": singleGeo,
      "select": singleSELECT,
      "type": type,
      "categories": categoriesArray,
      "item": JSON.stringify(item),
      "category": {
        "id": category,
      }
    };
    let result = await axios({
      method: 'post',
      url: CONFIG.ELASTIC_SEARCH[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'] + `items/_doc/${item_id}?refresh`,
      data: data
    })
    return this.itemRepositoryDI.setAsSyncElastic({ id: item_id })
  }


  async toQueueItemDoc({ item_id,
    clobs,
    longitude,
    latitude,
    user_id,
    catOptions,
    description,
    title,
    tags,
    status,
    terms,
    type,
    category,
    categories,
    createdAt, expired_at, item,
    project_id,
    es_operations,
    external_id }) {
    //console.log(JSON.stringify(catOptions, true))

    let singleGeo = catOptions.filter(item => {
      return item.type == 'SINGLE'
    }).map(item => {
      var value = {};
      // value[item.catOption.cat_opt_type_template.type] = ['float', 'long'].includes(item.catOption.cat_opt_type_template.type) ? parseFloat(item.val) : item.val
      value = item.val;
      value = ['float', 'date', 'text', 'long'].map(item => {
        return {}[item] = item.val;
      })
      return {
        cat_opt_id: item.cat_opt_id,
        type: item.type,
        dataType: item.catOption.cat_opt_type_template.type,
        order: item.catOption.cat_opt_type_template.order,
        cat_opt_temp_id: item.catOption.id,
        co_id: item.co_id,
        value: {
          float: parseFloat(item.val),
          date: Date.parse(item.val),
          text: item.val,
          long: parseInt(item.val)

        }
        // conc: item.cat_opt_id + ";" + String(value)
      }

    })

    let singleSELECT = catOptions.filter(item => {
      return ['SELECT', 'MULTI_SELECT'].includes(item.type)
    }).map(item => {
      var value = {};
      value = {
        ...item.select.value_translation
      }
      return {

        cat_opt_id: item.cat_opt_id,
        type: item.type,
        dataType: item.select.cat_opt_type_template.type,
        order: item.select.cat_opt_type_template.order,
        cat_opt_temp_id: item.select.id,
        co_id: item.co_id,
        value: value
      }

    })

    let singleDep = catOptions.filter(item => {
      return ['SINGLE_DEPENDENCY'].includes(item.type)
    })

    let singleDepHASH = {}
    singleDep.forEach(i => {
      if (!singleDepHASH[i.co_id]) { singleDepHASH[i.co_id] = [{}, {}, {}] }
      singleDepHASH[i.co_id][i.catOption.cat_opt_type_template.order - 1] = i;
    })
    let singleDepRes = []
    Object.keys(singleDepHASH).forEach(i => {

      let obj = singleDepHASH[i]

      let res = {

        cat_opt_id_dep: obj[1].cat_opt_id,
        cat_opt_id_dep_val: obj[1].val,
        cat_opt_id: obj[0].cat_opt_id,
        type: obj[0].type,
        dataType: obj[0].catOption.cat_opt_type_template.type,
        order: obj[0].catOption.cat_opt_type_template.order,
        co_id: obj[0].co_id,
        value: {
          float: parseFloat(obj[0].val),
          date: Date.parse(obj[0].val),
          text: obj[0].val,
          long: parseInt(obj[0].val)

        }

      }
      singleDepRes.push(res)
    })



    let termsHash = {}
    terms.forEach(i => {
      if (!termsHash[i.col_id]) { termsHash[i.co_id] = [] }
      termsHash[i.co_id].push({
        ...i,
        min: {
          float: parseFloat(i.start_date),
          date: i.start_date,
          text: i.start_date,
          long: parseInt(i.start_date)

        },
        max: {
          float: parseFloat(i.end_date),
          date: i.end_date,
          text: i.end_date,
          long: parseInt(i.end_date)
        }
      });
    })

    let termsObj = Object.keys(termsHash).map(i => {
      let obj = termsHash[i].map(i => {
        return { min: i.min, max: i.max }
      })
      let details = termsHash[i][0]
      return {
        ...details,
        start_date: undefined,
        end_date: undefined,
        project_id: undefined,
        col_id: undefined,
        min: undefined,
        max: undefined,
        values: obj,
        values_nested: obj

      }
    })


    let categoriesArray = categories.map(item => {
      return {
        id: item.id, category: {
          ...item.translation
        }
      }
    });
    let cleanItem = {
      ...item,

      categories: [...categories.map(i => {
        return { id: i.id }
      })],
      itemCategoryOption: [...item.itemCategoryOption.map(i => {

        i.category_link = undefined
        i.cat_opt_temp = undefined
        return i;
      })]
    };
    Object.keys(cleanItem).filter(i => {
      return i.startsWith('clobSearch_')
    }).forEach(i => {
      cleanItem[i] = undefined
    });

    let data = {
      "location": [longitude, latitude],
      "external_id": external_id,
      "user_id": user_id,
      "title": title,
      "description": description,
      "clob": clobs,
      "status": status,
      "created_at": createdAt,
      "expired_at": expired_at,
      "single_dependencies": singleDepRes,
      "between": termsObj,
      "tags": tags.map(item => {
        return {
          tag: item.label
        }
      }),
      "tagsArray": tags.map(item => {
        return { tag: item.label }
      }),
      "single": singleGeo,
      "select": singleSELECT,
      "type": type,
      "categories": categoriesArray,
      "item": JSON.stringify(cleanItem),
      "category": {
        "id": category,
      }
    };
    //let result = await axios({
    //  method: 'post',
    //  url: CONFIG.ELASTIC_SEARCH[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'] + `items/_doc/${item_id}?refresh`,
    // data: data
    //})

    //await this.itemRepositoryDI.setAsSyncElastic({ id: item_id })
    return {
      id: item_id,
      project_id: project_id,
      es_operations: es_operations,
      data: data
    }
  }

  async deleteDoc({ user_id }) {

  }
  async searchDoc({ latitude, user_id, longitude, text, distance, tags, select, categories, itemType, expired_at, startDate, endDate, createdInterval, catoptions, catOptionsFilter, size, item_id, page, withExpired, catoptionsAll }) {

    let fullText = text ? text : "";
    let userGuid = user_id;
    let radius = distance;
    if (distance == 'all') {
      radius = '5000km'
    }
    let tagsTerms = [];
    if (tags != undefined) {
      tagsTerms = tags.length > 0 ? (tags.map(item => {
        return {
          "nested": {
            "path": "tags", "query": {
              "match": { "tags.tag": { "query": item, "fuzziness": 0, "operator": "and", } }
            }
          }

        };
      })) : [];
    }

    let selectOptionsList = [];
    //let singleOptions =Object.keys(catOptionsFilter).map(item=>{
    //});

    if (catOptionsFilter != undefined && catOptionsFilter != '') {
      try {

        Object.keys(catOptionsFilter).map(item => {
          if (item.endsWith("_SELECT") == true || item.endsWith("_MULTI_SELECT") == true) {
            if (catOptionsFilter[item][0] != undefined) {
              catOptionsFilter[item].forEach(ids => {
                selectOptionsList.push(ids.id)
              })
            }
          }
        })
      } catch (exception) {
        console.log(exception);
      }
    }
    let selectOptions = null;
    if (selectOptionsList != undefined || selectOptionsList.length > 0) {

      selectOptions = selectOptionsList.length > 0 ? {
        "terms_set": {
          "select.cat_opt_id.keyword": {
            "terms": selectOptionsList,
            "minimum_should_match_script": {
              "source": "params.num_terms"
            }
          }
        }
      } : null;
    }
    let singleOptionsList = []
    if (catOptionsFilter != undefined && catOptionsFilter != '') {
      try {

        Object.keys(catOptionsFilter).map(item => {
          if (item.endsWith("_SINGLE") == true) {
            if (catOptionsFilter[item][0] != undefined) {
              catOptionsFilter[item].forEach(element => {
                singleOptionsList.push(
                  {
                    "nested": {
                      "path": "single",
                      "query": {
                        "bool": {
                          "must": [
                            { "match": { "single.co_id": item.replace('_SINGLE', '') } },
                            {
                              "range": {
                                "single.value.float": {
                                  "gte": element.min,
                                  "lte": element.max
                                }
                              }
                            }
                          ]
                        }
                      }
                    }
                  }

                )
              })
            }
          }
          if (item.endsWith("_SINGLE_DEP") == true) {
            if (catOptionsFilter[item][0] != undefined) {
              catOptionsFilter[item].forEach(element => {
                singleOptionsList.push(
                  {
                    "nested": {
                      "path": "single_dependencies",
                      "query": {
                        "bool": {
                          "must": [
                            {

                              "term": {
                                "single_dependencies.co_id.keyword": item.replace('_SINGLE_DEP', '')
                              }
                            },
                            {
                              "term": {
                                "single_dependencies.cat_opt_id_dep_val.keyword": element.id
                              }
                            },
                            {
                              "range": {
                                "single_dependencies.value.float": {
                                  "gte": element.min,
                                  "lte": element.max
                                }
                              }
                            }
                          ]
                        }
                      }
                    }
                  }

                )
              })
            }
          }
          if (item.endsWith("_NOT_BETWEEN") == true) {
            if (catOptionsFilter[item][0] != undefined) {
              catOptionsFilter[item].forEach(element => {

                singleOptionsList.push(
                  {
                    "bool": {
                      "should": [
                        {
                          "bool": {
                            "must_not": {

                              "nested": {
                                "path": "between",
                                "query": {
                                  "bool": {
                                    "must": [
                                      {
                                        "match": {
                                          "between.co_id": item.replace('_NOT_BETWEEN', '')
                                        }
                                      }
                                    ]
                                  }
                                }
                              }

                            }
                          }
                        },

                        {
                          "nested": {
                            "path": "between",
                            "query": {
                              "bool": {

                                "must": [
                                  {

                                    "match": {
                                      "between.co_id": item.replace('_NOT_BETWEEN', '')
                                    }
                                  }
                                ],
                                "must_not": [
                                  {
                                    "range": {
                                      "between.values.min.date": {
                                        "lte": element.max,
                                        "gte": element.min
                                      }
                                    }
                                  },
                                  {
                                    "range": {
                                      "between.values.max.date": {
                                        "lte": element.max,
                                        "gte": element.min

                                      }
                                    }
                                  }
                                ]
                              }
                            }
                          }
                        }
                      ]
                    }
                  }


                )
              })
            }
          }

        })
      } catch (exception) {
        console.log(exception);
      }
    }

    let categoriesJson = null;
    if (categories != undefined) {
      categoriesJson = categories.filter(item => { return item != null && item != '' }).length > 0 ? {
        "terms_set": {
          "categories.id.keyword": {
            "terms": categories
            ,
            "minimum_should_match_script": {
              "source": "params.num_terms"
            }
          }
        }
      } : null;
    }
    let userJson = user_id != undefined ? {
      "term": {
        "user_id": {
          "value": user_id
        }
      }
    } : null

    let textArray = text != undefined && text != '' ?
      {
        "function_score": {
          "query": {
            "bool": {
              "should": [
                { "match": { "title": { "query": String(text), "operator": "and", "boost": 70.0, "fuzziness": 1 } } },
                { "match": { "title": { "query": String(text), "operator": "and", "boost": 30.0, "fuzziness": 4 } } },
                { "match": { "title": { "query": String(text), "operator": "or", "boost": 10.0, "fuzziness": 2 } } },
                { "match": { "description": { "query": String(text), "operator": "and", "boost": 30.0, "fuzziness": 3 } } },
                { "match": { "description": { "query": String(text), "operator": "and", "boost": 10.0, "fuzziness": 5 } } },
                {
                  "nested": {
                    "path": "clob",
                    "query": {
                      "match": { "clob.pl": { "query": String(text), "operator": "and", "fuzziness": 2, "boost": 20.0 } }
                    }
                  }
                },
                {
                  "nested": {
                    "path": "tags", "query": {
                      "match": { "tags.tag": { "query": String(text), "operator": "and", "fuzziness": 2, "boost": 40.0 } }
                    }
                  }
                },
                { "match": { "select.value.pl": String(text) } },
                { "match": { "categories.category.pl": String(text) } },
                {
                  "multi_match": {
                    "query": String(text),
                    "type": "cross_fields",
                    "fields": ["title^10", "description^2", "clob." + this.context.language, "tags.tag", "select.value." + this.context.language, "categories.category." + this.context.language],
                    "operator": "and"

                  }
                }

              ]
            }
          },
          "script_score": {
            "script": "(10.0 * _score > 10)?_score:0"
          },
          "score_mode": "sum",
          "min_score": 10
        }
      } : null

    let aggs = {};
    console.log('CREATE AGGS')
    catoptions.filter(i => { return ['SINGLE'].includes(i.cat_opt.type) }).forEach(item => {
      console.log(item)

      aggs[item.id] = {
        "nested": {
          "path": "single"
        },
        "aggregations": {
          "catOption": {
            "filter": {
              "term": {
                "single.co_id.keyword": item.id
              }
            },
            "aggregations": {
              "hist_values": {
                "scripted_metric": {
                  "init_script": "state.value = []",
                  "map_script": "if(doc['single.value.float'].size()!=0){state.value.add(doc['single.value.float'].value)}",
                  "combine_script": "return state",
                  "reduce_script": scriptAgg //{ "id": "single_reduce_agg_hist" },
                }
              }

            }
          }
        }

      }
    })

    catoptions.filter(i => { return ['SINGLE_DEPENDENCY'].includes(i.cat_opt.type) }).forEach(item => {
      //  console.log(item)
      let uom_dic = item.cat_opt_temp.sort((a, b) => { return a.order > b.order })[1].dim_ref_id
      let co_ref = catoptionsAll.filter(co => {
        return co.dim_id == uom_dic
      })[0]
      if (co_ref.length == 0) {
        return;
      }
      let aggregations = {};
      co_ref.cat_opt_temp.forEach(ref => {
        aggregations[ref.id] = {
          "filter": {
            "bool": {
              "must": [
                {
                  "term": {
                    "single_dependencies.co_id.keyword": item.id
                  }
                },
                {
                  "term": {
                    "single_dependencies.cat_opt_id_dep_val.keyword": ref.id
                  }
                },
                {
                  "exists": {
                    "field": "single_dependencies.value.float"
                  }
                }
              ]
            }
          },
          "aggregations": {
            "hist_values": {
              "scripted_metric": {
                "init_script": "state.value = []",
                "map_script": "if(doc['single_dependencies.value.float'].size()!=0){state.value.add(doc['single_dependencies.value.float'].value)}",
                "combine_script": "return state",
                "reduce_script": scriptAgg//{ "id": "single_reduce_agg_hist" },
              }
            }
          }
        }


      })
      aggs[item.id] = {

        "nested": {
          "path": "single_dependencies"
        },
        "aggregations": aggregations

      }
      //console.log(aggs[item.id])
    })
    let body = {
      "stored_fields": [
        "doc._id",
        "doc._source"

      ],
      "_source": ["user_id", "categories", "item"],
      "size": size,
      "from": page ? page * size : 0,
      "aggregations": {
        "select": {
          "terms": {
            "field": "select.cat_opt_id.keyword"

          }
        },
        "categories": {
          "terms": {
            "field": "categories.id.keyword"

          }
        },
        "tags": {
          "terms": {
            "field": "tagsArray.tag",
            "size": 10

          }
        },
        "data_day_histogram": {
          "auto_date_histogram": {
            "field": "created_at",
            "buckets": 50

          }
        },
        ...aggs


      },
      "sort": [
        { "created_at": { "order": "desc" } }
      ],
      "query": {
        "bool": {
          "must": [
            textArray,
            ...tagsTerms,
            selectOptions,
            categoriesJson,
            userJson,
            ...singleOptionsList
            /*    {
                  "script": {
                    "script": {
                      "source": "def value=Double.parseDouble(params.value);for (def item : doc['single.conc.keyword']){def val = item.indexOf(';');def id = item.substring(0,val) ;def values =item.replace(id+';','') ;def dblValue=Double.parseDouble(values);if(id==params.uid && ((params.operator =='gtl' && dblValue >= value) || (params.operator =='ltr'&& dblValue <= value))){return true}} return false;",
                      "params": {
                        "uid": "1907c124-f3fa-4072-8da6-f0568e2c5071",
                        "operator": "gtl",
                        "value": "49.8"
                      }
                    }
                  }
                },
                      
    {
    "nested" : {
            "path" : "single",
            "query" : {
                "bool" : {
                    "must" : [
                    { "match" : {"single.cat_opt_id" : "80ccce8f-455e-483c-847f-33f3a6a1dbe0"} },
                    { "range" : {"single.value.float" : {"gt" :45}} }
                    ]
                }
            }
    }  } ,  ,*/

          ].filter(item => { return item != null }),
          "filter": [
            distance == 'all' || distance == undefined ? undefined : {
              "geo_distance": {
                "distance": radius,
                "location": {
                  "lat": latitude,
                  "lon": longitude
                }
              }
            },
            {
              "bool": {
                "must": [

                  withExpired != true && {
                    "range": {
                      "expired_at": {
                        "gte": new Date()
                      }
                    }
                  },
                  startDate != undefined ? {
                    "range": {
                      "created_at": {
                        "gte": startDate + (createdInterval != undefined && createdInterval != "" && createdInterval != null ?
                          createdInterval.includes("h") > 0 ? "||/h-" + (parseInt(createdInterval) > 1 ? Math.ceil(parseInt(createdInterval) / 2) : parseInt(createdInterval)) + "h" :
                            createdInterval.includes("d") > 0 ? "||/d-" + (parseInt(createdInterval) > 1 ? Math.ceil(parseInt(createdInterval) / 2) : parseInt(createdInterval)) + "d" :
                              createdInterval.includes("w") > 0 ? "||/w-" + (parseInt(createdInterval) > 1 ? Math.ceil(parseInt(createdInterval) / 2) : parseInt(createdInterval)) + "w" :
                                createdInterval.includes("m") > 0 ? "||/m-" + (parseInt(createdInterval) > 1 ? Math.ceil(parseInt(createdInterval) / 2) : parseInt(createdInterval)) + "m" :
                                  createdInterval.includes("y") > 0 ? "||/y-" + (parseInt(createdInterval) > 1 ? Math.ceil(parseInt(createdInterval) / 2) : parseInt(createdInterval)) + "y" :
                                    createdInterval.includes("M") > 0 ? "||/M-" + (parseInt(createdInterval) > 1 ? Math.ceil(parseInt(createdInterval) / 2) : parseInt(createdInterval)) + "M" :
                                      createdInterval.includes("s") > 0 ? "||/s-" + (parseInt(createdInterval) > 1 ? Math.ceil(parseInt(createdInterval) / 2) : parseInt(createdInterval)) + "s" : "" : ""),

                        "lte": endDate + (createdInterval != undefined && createdInterval != "" && createdInterval != null ?
                          createdInterval.includes("h") > 0 ? "||/h+" + (parseInt(createdInterval) > 1 ? Math.ceil(parseInt(createdInterval) / 2) : parseInt(createdInterval)) + "h" :
                            createdInterval.includes("d") > 0 ? "||/d+" + (parseInt(createdInterval) > 1 ? Math.ceil(parseInt(createdInterval) / 2) : parseInt(createdInterval)) + "d" :
                              createdInterval.includes("w") > 0 ? "||/w+" + (parseInt(createdInterval) > 1 ? Math.ceil(parseInt(createdInterval) / 2) : parseInt(createdInterval)) + "w" :
                                createdInterval.includes("m") > 0 ? "||/m+" + (parseInt(createdInterval) > 1 ? Math.ceil(parseInt(createdInterval) / 2) : parseInt(createdInterval)) + "m" :
                                  createdInterval.includes("y") > 0 ? "||/y+" + (parseInt(createdInterval) > 1 ? Math.ceil(parseInt(createdInterval) / 2) : parseInt(createdInterval)) + "y" :
                                    createdInterval.includes("M") > 0 ? "||/M+" + (parseInt(createdInterval) > 1 ? Math.ceil(parseInt(createdInterval) / 2) : parseInt(createdInterval)) + "M" :
                                      createdInterval.includes("s") > 0 ? "||/s+" + (parseInt(createdInterval) > 1 ? Math.ceil(parseInt(createdInterval) / 2) : parseInt(createdInterval)) + "s" : "" : ""),
                      }
                    }
                  } : null
                ].filter(item => { return item != null })
              }
            }
          ]
        }
      }


    }
    console.log(CONFIG.ELASTIC_SEARCH[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'] + String(this.context.project.id).toLowerCase() + `-items/_search`)
    console.log(JSON.stringify(body));
    return await axios({
      method: 'post',
      url: CONFIG.ELASTIC_SEARCH[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'] + String(this.context.project.id).toLowerCase() + `-items/_search`,
      data: body

    })
  }



  async getItemById({ item_id }) {

    return await axios({
      method: 'get',
      url: CONFIG.ELASTIC_SEARCH[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'] + String(this.context.project.id).toLowerCase() + `-items/_doc/${item_id}`


    })
  }




  async addToQueue({ item_id, operation }) {
    let item = await this.itemServiceDI.setContext(this.context).getItem({ uids: [item_id] })
    item = item[0];
    let categories = await this.categoryServiceDI.setContext(this.context).getCategoriesParents({ ids: item.category_id })
    categories = [...categories];
    item = {
      ...item,
      categories: categories
    };
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var expired = new Date(Date.now() + 120965);
    var dateExpired = expired.getFullYear() + '-' + (expired.getMonth() + 1) + '-' + expired.getDate();
    let clobs = {
      pl: "",
      us: "",
      de: "",
      ru: "",
      fr: "",
      es: "",
      no: "",
      zh_cn: ""
    }
    clobs = Object.keys(clobs).forEach(clob => {
      return item["clobSearch_" + clob]
    });

    let catOptions = item.itemCategoryOption.map(catValue => {

      return {
        id: catValue.id,
        cat_opt_id: catValue.cat_opt_temp.id,
        type: catValue.category_link.catOption.cat_opt.type,
        dataType: catValue.cat_opt_temp.cat_opt_type_template.type,
        order: catValue.cat_opt_temp.order,
        cat_opt_temp_id: catValue.co_temp_id,
        co_id: catValue.cat_opt_temp.co_id,
        val: catValue.value,//TO REMOVE
        value: catValue.value,
        conc: catValue.cat_opt_temp.co_id + ";" + String(catValue.value),
        select: catValue.cat_opt_temp,
        catOption: catValue.cat_opt_temp
      }
    })
    try {
      let newItem = await this.toQueueItemDoc({
        item_id: item.id,
        longitude: item.longitude || 0,
        latitude: item.latitude || 0,
        user_id: item.user_id,
        clobs: clobs,
        title: item.name,
        description: item.description,
        catOptions: catOptions,
        terms: item.itemCategoryOptionTerms.filter(i => {
          return new Date() < new Date(i.end_date)
        }),
        status: item.status,
        type: item.type,
        category: item.category_id,
        tags: item.tags.map((tag) => { return { label: tag.tag } }),
        categories: item.categories,
        createdAt: item.createdAt ? item.createdAt : today.toISOString(),
        expired_at: (item.expired_date != undefined && item.expired_date != null) ? item.expired_date : expired.toISOString(),
        item: item,
        project_id: item.project_id,
        es_operations: operation ? operation : item.es_operations,
        external_id: item.external_id
      });
      global.queueChannel.publish(CONFIG.ITEM_ES_QUEUE, this.context.project.id,
        newItem
        , {
          contentType: 'application/json', persistent: true, expiration: 500 * 1000, messageId: item_id, headers: {
            Authorization: 'Bearer ' + this.context.token,
            ProjectAuthorization: 'Bearer ' + this.context.projectToken
          }
        }
      )
    } catch (er) {
      console.log(er)
    }
  }
}
/*
"80ccce8f-455e-483c-847f-33f3a6a1dbe0": {
      "nested": {
        "path": "single"
      },
      "aggregations": {
        "catOption": {
          "filter": {
            "match": {
              "single.cat_opt_id": "80ccce8f-455e-483c-847f-33f3a6a1dbe0"
            }
          },
          "aggregations": {
            "test": {
              "histogram": {
                "field": "single.value.long",
                "interval": 100
              }
            },
            "value_min": {
              "min": {
                "field": "single.value.long"
              }
            },
            "value_max": {
              "max": {
                "field": "single.value.long"
              }
            }
          }
        }
      }
    }





     "80ccce8f-455e-483c-847f-33f3a6a1dbe0": {
      "nested": {
        "path": "single"
      },
      "aggregations": {
        "catOption": {
          "filter": {
            "term": {
              "single.cat_opt_id.keyword": "80ccce8f-455e-483c-847f-33f3a6a1dbe0"
            }
          },
          "aggregations": {
            "test": {
                "scripted_metric": {
                  "init_script": "state.value = []",
                  "map_script": "state.value.add(doc['single.value.long'].value)",
               "combine_script":"def score_min = -1; def score_max = 0; def interval=8;def bucket=40;def size=0;for (el in state.value) {if (score_min == -1) {score_min = el} else if (el < score_min) {score_min = el}} for (el in state.value) {if (el > score_max) {score_max = el}} state.buckets=[];state.size=state.value.length; if(state.size<bucket){bucket=state.size} if(bucket==0){bucket=-1;}interval=score_max-score_min;interval=interval/bucket;if(interval==0){interval=1} state.score_min=score_min;state.interval=interval;state.score_max=score_max;for(def i=0;i<bucket;i++){state.buckets.add([i,0,state.score_min+(i*state.interval)])}state.buckets.add([state.buckets.length,0,score_max]);for(el in state.value){def i=Math.floor((el-state.score_min)/interval); state.buckets[(int)i]=[(int)i,++state.buckets[(int)i][1],state.buckets[(int)i][2]] } state.value=null;return state",
                "reduce_script":" return states"
                }

            }

          }
        }
      }
    }
*/