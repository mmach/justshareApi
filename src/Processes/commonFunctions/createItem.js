import { v4 } from "uuid";
import Promise from "bluebird";

export function createSearchClob(newItem, itemId) {
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
  Object.keys(clobs).forEach(item => {
    newItem.itemCategoryOption.filter(cat => {
      return ['SINGLE', 'SELECT', 'MULTISELECT', 'GEO'].includes(cat.type)
    }).forEach(cat => {
      if ((cat.catOption ? cat.catOption.is_not_in_clob : false) != true) {
        clobs[item] += (cat.select ? cat.select.value_translation[item] : cat.val) + " ; "

      }
    })
    newItem.tags.forEach(tag => {
      clobs[item] += tag.label + ' ; ';
    })
  })
  Object.keys(clobs).forEach(item => {
    newItem["clobSearch_" + item] = clobs[item];
  })

  return { ...newItem };

}
function getCategoriesValue(newItem) {
  let catOptions = newItem.itemCategoryOption.filter(cat => {
    return cat.type == 'GEO';
  });
  if (catOptions.length > 0) {
    const latitude = catOptions.find(item => { return item.cat_opt_temp.order == 2 })
    newItem.latitude = latitude && latitude.value
    const longitude = catOptions.find(item => { return item.cat_opt_temp.order == 1 })
    newItem.longitude = longitude && longitude.value
  }

  return { ...newItem };
}

async function insertBlobs(newItem, itemId) {
  let blobs = newItem.itemCategoryOption.filter(cat => {
    return ['IMAGES_BOUNCE', 'IMAGE'].includes(cat.type) && cat.content
  })

  await Promise.mapSeries(blobs, async item => {
    let resulsts = await this.blobServiceDI.setContext(this.context).uploadImageAndSave({
      blob: item.content,
      itemId: itemId
    });
    item.value = resulsts.dataValues.id;
    return resulsts
  });
}


async function tagsInsert(newItem, itemId) {
  let existTagsArray = newItem.tags.filter(item => {
    return item.id != undefined
  })
  let newTags = newItem.tags.filter(item => {
    return item.id == undefined
  })
  newTags = newTags.map(item => {
    item.id = v4()
    return item
  })
  let idNewTagsArray = await this.tagServiceDI.setContext(this.context).insertUniq({ newTags: newTags });
  let tagsId = [];
  idNewTagsArray.forEach(item => {
    tagsId.push(item);
  })
  existTagsArray.forEach(item => {
    tagsId.push(item.id);
  })

  let tagsArray = await tagsId.map(tag => {
    return this.itemServiceDI.setContext(this.context).insertTag({
      item_id: itemId, tag_id: tag
    })
  })
  await Promise.all(tagsArray);
}
export async function createItem(newItemParam) {
  let newItem = { ...newItemParam };
  console.log(newItemParam)
  newItem.user_id = this.context.user.id;
  newItem = createSearchClob.bind(this)(newItem);
  newItem = getCategoriesValue.bind(this)(newItem);
  newItem.categories = await this.categoryServiceDI.setContext(this.context).getCategoriesParents({ ids: newItem.category_id })
  let categories = [...newItem.categories];
  let cat = categories.filter(item => { return item.id == newItem.category_id })[0]

  var today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(today.getDate() + (cat.expired_day != null ? Number(cat.expired_day) : 5000));
  newItem.expired_date = tomorrow
  newItem.es_operations = 'I';
  let createdItem = await this.itemServiceDI.setContext(this.context).upsert({ model: newItem, withProject: true });
  let newCreatedItem = createdItem[0].dataValues;

  await Promise.all([
    tagsInsert.bind(this)(newItem, newCreatedItem.id),
    insertBlobs.bind(this)(newItem, newCreatedItem.id)])
  let array = newItem.itemCategoryOption.map(coItem => {
    return this.itemServiceDI.setContext(this.context).upsertCategoryOption({ model: coItem, item_id: newCreatedItem.id })
  })

  await Promise.all(array)
  this.ITEM = newItem;
  this.model = newItem;
  return newItem;
}


