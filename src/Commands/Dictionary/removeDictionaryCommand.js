import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import { DictionaryDTO } from "justshare-shared";

("use strict");



export default class RemoveDictionaryCommand extends BaseCommand {
  constructor({ logFileInfrastructureDI,  authInfrastructureDI, projectInfrastructureDI, translationServiceDI }) {
    super({ logFileInfrastructureDI,  projectInfrastructureDI, authInfrastructureDI });
    this.translationServiceDI = translationServiceDI;
  };
  init(dto) {
    this.model = Object.assign(new DictionaryDTO(), dto);
  }
  async action() {

    this.translationServiceDI.setContext(this.context).delete({ model: this.model, withProject: true })
    //this.dictionaryDI.set(this.model.code, this.model.type, this.model);

  }
}
