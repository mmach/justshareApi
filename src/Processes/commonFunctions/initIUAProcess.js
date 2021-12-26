import { LinkItem, GetValueByDim, DimensionsList, StatusesList } from 'justshare-shared'

let initIUAProcess = async function () {
  this.IUA = await this.itemUserActionServiceDI.setContext(this.context).getById({ id: this.model.iua_id, withProject: true })
  let itemTransaction = await this.itemTransactionsServiceDI.setContext(this.context).getItemTransaction({ iua_id: [this.IUA.id], status_id: undefined });
  itemTransaction[0].categories = await this.categoryServiceDI.setContext(this.context).getCategoriesParents({ ids: itemTransaction[0].category.id })
  this.itemTransaction = itemTransaction[0]
  let ids = this.itemTransaction.categories.map(item => { return item.id });
  this.catOptions = await this.categoryOptionServiceDI.setContext(this.context).getRelatedOptions({ category_ids: ids });
  this.dimensions = await this.dimensionsProjectServiceDI.setContext(this.context).getDimensionsFlat({});
  this.dimensions = await this.dimensionsProjectServiceDI.setContext(this.context).getDimensionsFlat({});

  this.user_owner = await  this.userServiceDI.getById({ user_id: itemTransaction.user_id, withProject: true })
  //this.users_involved = await  this.userServiceDI.getById({ user_id: itemTransaction.user_id, withProject: true })

  this.itemTransaction = LinkItem(this.itemTransaction, this.catOptions, null, this.dimensions, this.context.language)
  return {
    IUA: this.IUA,
    itemTransaction: this.itemTransaction,
    catOptions: this.catOptions,
    dimensions: this.dimensions
  }
}


export default initIUAProcess
