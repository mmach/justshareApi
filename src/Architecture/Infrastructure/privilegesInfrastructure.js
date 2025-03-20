"use strict";

import { ServerException } from '../Exceptions/serverException.js';
import { Enums } from 'justshare-shared'
import { BaseInfrastracture } from '../Base/baseInfrastructure.js';

export class PrivilegesInfrastructure extends BaseInfrastracture {
    constructor() {
        super();
    };

    async executeLayer(action) {
        console.log(action.privileges)
        for (var i = 0; i < action.privileges.length; i++) {
            // do something

            let result = await action.privileges[i].bind(action)()
            if (!result) {
                throw (new ServerException()).throw({ code: 'PRIVILEGES_INVALID_ERROR', type: Enums.CODE.ERROR });
            }
        }

        return action;
    }

}
