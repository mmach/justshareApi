// @ts-nocheck

import BaseService from "../Architecture/baseService.js";
import UnitOfWork from "../unitOfWork.js";
import { UserRegisterInternalDTO } from "justshare-shared";

import CONFIG from "../config.js";
import axios from 'axios'




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
  constructor({ unitOfWorkDI, itemRepositoryDI }) {
    super({ unitOfWorkDI });
    this.itemRepositoryDI = itemRepositoryDI;
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
    category, categories, created_at, expired_at, item }) {
    console.log(JSON.stringify(catOptions, true))

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
        "pl": item.select["value_pl"],
        "us": item.select["value_us"],
        "no": item.select["value_no"],
        "es": item.select["value_es"],
        "ru": item.select["value_ru"],
        "fr": item.select["value_fr"],
        "zh_cn": item.select["value_zh_cn"],
        "de": item.select["value_de"]
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
        id: item.id, category: {
          "pl": item.category_pl,
          "us": item.category_us,
          "no": item.category_no,
          "es": item.category_es,
          "ru": item.category_ru,
          "fr": item.category_zh_cn,
          "zh_cn": item.category_zh_cn,
          "de": item.category_de


        }
      }
    });
    console.log(tags);
    let data = {
      "location": [longitude, latitude],

      "user_id": user_id,
      "title": title,
      "description": description,
      "clob": clobs,
      "status": status,
      "created_at": created_at,
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
    console.log(JSON.stringify(data))
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
    type,
    category, categories, created_at, expired_at, item }) {
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
        "pl": item.select["value_pl"],
        "us": item.select["value_us"],
        "no": item.select["value_no"],
        "es": item.select["value_es"],
        "ru": item.select["value_ru"],
        "fr": item.select["value_fr"],
        "zh_cn": item.select["value_zh_cn"],
        "de": item.select["value_de"]
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
        id: item.id, category: {
          "pl": item.category_pl,
          "us": item.category_us,
          "no": item.category_no,
          "es": item.category_es,
          "ru": item.category_ru,
          "fr": item.category_zh_cn,
          "zh_cn": item.category_zh_cn,
          "de": item.category_de


        }
      }
    });
    let data = {
      "location": [longitude, latitude],

      "user_id": user_id,
      "title": title,
      "description": description,
      "clob": clobs,
      "status": status,
      "created_at": created_at,
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
    //let result = await axios({
    //  method: 'post',
    //  url: CONFIG.ELASTIC_SEARCH[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'] + `items/_doc/${item_id}?refresh`,
    // data: data
    //})

    //await this.itemRepositoryDI.setAsSyncElastic({ id: item_id })
    return {
      id: item_id,
      data: data
    }
  }

  async deleteDoc({ user_id }) {

  }
  async searchDoc({ latitude, user_id, longitude, text, distance, tags, select, categories, itemType, expired_at, startDate, endDate, createdInterval, catoptions, catOptionsFilter, size, item_id, page }) {

    let fullText = text ? text : "";
    console.log(fullText);
    let userGuid = user_id;
    let radius = distance;
    if (distance == 'all') {
      radius = '5000km'
    }
    let tagsTerms = null;
    if (tags != undefined) {
      tagsTerms = tags.length > 0 ? (tags.map(item => {
        return {
          "nested": {
            "path": "tags", "query": {
              "match": { "tags.tag": { "query": item, "fuzziness": 0, "operator": "and", } }
            }
          }

        };
      })) : null;
    }

    let selectOptionsList = [];
    //let singleOptions =Object.keys(catOptionsFilter).map(item=>{
    //});
    if (catOptionsFilter != undefined && catOptionsFilter != '') {
      try {
        console.log(catOptionsFilter)

        Object.keys(catOptionsFilter).map(item => {
          if (item.endsWith("_SELECT") == true || item.endsWith("_MULTI_SELECT") == true) {
            console.log(item)
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
    catoptions.forEach(item => {
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
                  "map_script": "state.value.add(doc['single.value.long'].value)",
                  "combine_script": "def score_min = -1; def score_max = 0; def interval=0.8;def uniqValues=[];def bucket=40;def size=0;for (el in state.value) {if (score_min == -1) {score_min = el} else if (el < score_min) {score_min = el}} for (el in state.value) {if (el > score_max) {score_max = el}} state.buckets=[];state.size=state.value.length; if(state.size<bucket){bucket=state.size} if(bucket==0){bucket=-1;}interval=score_max-score_min;interval=interval/bucket;if(interval==0){interval=1} state.score_min=score_min;state.interval=interval;state.score_max=score_max;for(def i=0;i<bucket;i++){state.buckets.add([i,0,state.score_min+(i*state.interval),state.score_min+((1+i)*state.interval)])}state.buckets.add([state.buckets.length,0,score_max,score_max+interval]);for(def i=0;i<state.value.length;i++){for(def y=0;y<state.buckets.length;y++){if(state.buckets[y][2]<=state.value[i] && state.buckets[y][3]>=state.value[i] ){state.buckets[y][1]++;break;}}} return state",
                  "reduce_script": " return states"
                }
              }

            }
          }
        }

      }
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
            tagsTerms,
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

                  {
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
    console.log(JSON.stringify(body));
    return await axios({
      method: 'post',
      url: CONFIG.ELASTIC_SEARCH[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'] + `items/_search`,
      data: body

    })
  }



  async getItemById({ item_id }) {

    return await axios({
      method: 'get',
      url: CONFIG.ELASTIC_SEARCH[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'] + `items/_doc/${item_id}`


    })
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