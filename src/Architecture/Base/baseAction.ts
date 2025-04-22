import { AuthContextDTO } from "../../Dto/index.js";
import { CodeDictionary } from "../Dictionary/codeDictionary.js";
import { ServerException } from "../Exceptions/serverException.js";
import { AuthInfrastucture } from "../Infrastructure/authInfrastucture.js";
import { LogFileInfrastructure } from "../Infrastructure/logFileInfrastructure.js";
import { PrivilegesInfrastructure } from "../Infrastructure/privilegesInfrastructure.js";
import { ProjectInfrastructure } from "../Infrastructure/projectInfrastructure.js";
import { ValidatonInfrastructure } from "../Infrastructure/validatonInfrastructure.js";


("use strict");

export class BaseAction {

  context: AuthContextDTO
  model: any
  token: string
  dictionaryDI: CodeDictionary;
  logFileInfrastructureDI: LogFileInfrastructure;
  validationInfrastructureDI: ValidatonInfrastructure;
  privilegesInfrastructureDI: PrivilegesInfrastructure;
  authInfrastructureDI: AuthInfrastucture;
  projectInfrastructureDI: ProjectInfrastructure

  constructor({
    logFileInfrastructureDI,
    validationInfrastructureDI,
    authInfrastructureDI,
    privilegesInfrastructureDI,
    dictionaryDI,
    projectInfrastructureDI
  }: {

    logFileInfrastructureDI: LogFileInfrastructure,
    validationInfrastructureDI: ValidatonInfrastructure,
    authInfrastructureDI: AuthInfrastucture,
    privilegesInfrastructureDI: PrivilegesInfrastructure,
    dictionaryDI: CodeDictionary,
    projectInfrastructureDI: ProjectInfrastructure
  }) {
    this.model = {};
    this.dictionaryDI = dictionaryDI
    this.context = {
      language: '',
      user: {
        id: undefined,
        uid: undefined,
        is_admin: false,
        is_root: false,
        email: undefined
      },
      project: undefined,
      allowForAll: undefined
    };
    this.token = '';
    this.logFileInfrastructureDI = logFileInfrastructureDI;
    this.validationInfrastructureDI = validationInfrastructureDI;
    this.privilegesInfrastructureDI = privilegesInfrastructureDI;
    this.authInfrastructureDI = authInfrastructureDI;
    this.projectInfrastructureDI = projectInfrastructureDI;
  }
  
  init(dto: any) {
    this.model = dto;
  }

  async action() {
    throw (new ServerException()).throw({ code: "VIRTUAL" } as any);
  }
  async checkDTO(model: any) {
    let validationResult = await model.validation(this.model);
    if (validationResult.length > 0) {
      this.validationInfrastructureDI.addArrayInvalid(...validationResult);
    }
  }

  infrastructureOrder() {
    throw new ServerException().throw({ code: "VIRTUAL" } as any);
  }

  get privileges() { return [() => { return false; }] }

  async run() {
    this.infrastructureOrder();
    return await this.logFileInfrastructureDI.runChain(this);
  }
}
