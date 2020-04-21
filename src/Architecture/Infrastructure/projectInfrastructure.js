"use strict";

import BaseInfrastracture from "./../baseInfrastructure.js";
import jwt from 'jsonwebtoken';
import ServerException from "../Exceptions/serverException.js";
import fs from "fs";
import ProjectRepository from "../../Repository/projectRepository.js";


export default class ProjectInfrastructure extends BaseInfrastracture {

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
            let context = this.getDecodedToken(action.projectToken);
            let project = await this.projectRepositoryDI.getProjectInfo({ project_id: context.id })
            if (!project) {/*|| user.relogin_require == true) {*/
                throw 'AUTHORIZATION_PROJECT_ERROR'
            }
            action.context.project = project.dataValues;
            action.context.project.allowForAll = false;
            return await action;
        } catch (ex) {
            if (this.allowForAll) {
                action.context.project={}
                action.context.project.allowForAll = true;
                action.context.project.id = null;

                return await action;

            }
            throw (new ServerException()).throw({ code: "AUTHORIZATION_PROJECT_ERROR", type: "ERROR" });
        }
    }
}
