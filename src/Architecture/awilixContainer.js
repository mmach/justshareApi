"use strict";
import awilix from 'awilix';
import { LogFileInfrastructure } from './Infrastructure/logFileInfrastructure.js';
import { ValidatonInfrastructure } from './Infrastructure/validatonInfrastructure.js';
import { BaseAction } from './Base/baseAction'
import { BaseCommand } from './Base/baseCommand.js'
import { BaseQuery } from './Base/baseQuery.js'
import Logger from './logConfig.js'
import { DbTransactionInfrastucture } from './Infrastructure/dbTransactionInfrastucture.js';
import { AuthInfrastucture } from './Infrastructure/authInfrastucture.js';
import { ProjectInfrastructure } from './Infrastructure/projectInfrastructure.js';
import { ClosingInfrastructure } from './Infrastructure/closingInfrastructure.js';
import { CodeDictionary } from './Dictionary/codeDictionary.js';
import { PrivilegesInfrastructure } from './Infrastructure/privilegesInfrastructure.js';
import { MailSender } from './mailSender.js';

const { createContainer, asValue, asClass } = awilix;
let containerAwlix = createContainer();

let containerDI = {
    logFileInfrastructureDI: asClass(LogFileInfrastructure),
    validationInfrastructureDI: asClass(ValidatonInfrastructure),
    authInfrastructureDI: asClass(AuthInfrastucture),
    dbTransactionInfrastuctureDI: asClass(DbTransactionInfrastucture),
    closingInfrastructureDI: asClass(ClosingInfrastructure),
    projectInfrastructureDI: asClass(ProjectInfrastructure),
    //ACTIONS list 
    baseAction: asClass(BaseAction),
    baseCommand: asClass(BaseCommand),
    baseQuery: asClass(BaseQuery),
    loggerDI: asValue(Logger),
    mailSenderDI: asClass(MailSender),
    dictionaryDI: asClass(CodeDictionary),
    privilegesInfrastructureDI: asClass(PrivilegesInfrastructure)

}


containerAwlix.register(containerDI);

export const ContainerAwlix = containerAwlix