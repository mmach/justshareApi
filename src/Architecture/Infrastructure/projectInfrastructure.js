"use strict";

import fs from "fs";
import jwt from 'jsonwebtoken';
import ProjectRepository from "../../Repository/project/implementations/projectRepository.js";
import { BaseInfrastracture } from '../Base/baseInfrastructure.js';
import { ServerException } from '../Exceptions/serverException.js';


export class ProjectInfrastructure extends BaseInfrastracture {

    /**
     *Creates an instance of AuthInfrastucture.
     * @param {{projectRepositoryDI:ProjectRepository }
     * @memberof AuthInfrastucture
     */
    constructor({ projectRepositoryDI }) {
        super();
        this.projectRepositoryDI = projectRepositoryDI;
        this.allowForAll = false;
    }

    allowForAllProjects() {
        this.allowForAll = true;
    }
    getDecodedToken(pToken) {
        let token = ''
        if (pToken) {
            token = pToken.split(' ')[1];
        }
        else {
            throw 'AUTHORIZATION_PROJECT_ERROR'
        }
        let cert = fs.readFileSync('./cert.key');
        let decoded = jwt.verify(token, cert.toString('utf8'));
        return decoded
    }

    async executeLayer(action) {
        try {
            if (action.context.project && action.context.project.id) {
                return await action
            }
            let context = this.getDecodedToken(action.projectToken);

            let project = await this.projectRepositoryDI.getProjectInfo({ project_id: context.id })
            if (!project) {/*|| user.relogin_require == true) {*/
                throw 'AUTHORIZATION_PROJECT_ERROR'
            }
            action.context.project = project.dataValues;
            action.context.project.allowForAll = false;

            return await action;
        } catch (ex) {
            console.log(ex)
            if (this.allowForAll) {
                action.context.project = {}
                action.context.project.allowForAll = true;
                action.context.project.id = null;


                return await action;

            }
            throw (new ServerException()).throw({ code: "AUTHORIZATION_PROJECT_ERROR", type: "ERROR" });
        }
    }
}
