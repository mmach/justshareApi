
import { BuildItem } from "justshare-shared";


export let initCreateIUAProcess = async function (item) {
    let result = await this.elasticSearchServiceDI.setContext(this.context).getItemById({
        item_id: item.id,
    })
    let itemsResult = { item_id: result.data["_id"], user_id: result.data["_source"].user_id, item: JSON.parse(result.data["_source"].item) }
    let ids = result.data["_source"].categories.map(item => { return item.id });
    let catOptions = await this.categoryOptionServiceDI.setContext(this.context).getRelatedOptions({ category_ids: ids });
    let dimensions = await this.dimensionsProjectServiceDI.setContext(this.context).getDimensionsFlat({});

    let fromUrl = item.itemCategoryOption.filter(item => { return item.cat_opt_temp.is_from_url == true }).map(item => { return { id: item.co_temp_id, val: item.value } })
    let res = BuildItem(itemsResult.item, catOptions, fromUrl, dimensions, this.context.language)
    return { item: item, esItem: res }
}
export default initCreateIUAProcess;