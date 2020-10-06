import { LinkItem, GetValueByDim, DimensionsList, StatusesList } from 'justshare-shared'

let initIUAProcess = async function() {
    this.IUA = await this.itemUserActionServiceDI.setContext(this.context).getById({ id: this.model.iua_id, withProject: true })
    let itemTransaction = await this.itemTransactionsServiceDI.setContext(this.context).getItemTransaction({ iua_id: [this.IUA.id], status_id: undefined });
    itemTransaction[0].categories = await this.categoryServiceDI.setContext(this.context).getCategoriesParents({ ids: itemTransaction[0].category.id })
    this.itemTransaction = itemTransaction[0]
    let ids = this.itemTransaction.categories.map(item => { return item.id });
    this.catOptions = await this.categoryOptionServiceDI.setContext(this.context).getRelatedOptions({ category_ids: ids });
    this.dimensions = await this.dimensionsProjectServiceDI.setContext(this.context).getDimensionsFlat({});
    this.itemTransaction = LinkItem(this.itemTransaction, this.catOptions, null, this.dimensions, this.context.language)
  }


  export default initIUAProcess
