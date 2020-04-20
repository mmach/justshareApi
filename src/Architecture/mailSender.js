// @ts-nocheck

import json2xml from "json2xml";
import fs from "fs";
import CONFIG from "./../config.js";
import nodemailer from "nodemailer";
import * as xsltProcess from "xslt-processor";
import ServerException from "./Exceptions/serverException.js";
import mjml2html from 'mjml'
import CodeDictionary from "./Dictionary/codeDictionary.js";
import sendgridTransport from 'nodemailer-sendgrid-transport';
import nodemailerSendgrid from 'nodemailer-sendgrid'

export default class MailSender {
  constructor({ configServiceDI }) {
    this.configServiceDI = configServiceDI;
    this.project_id = null;
    this.context = null//console.log(configServiceDI);
    this.dictionary = new CodeDictionary();
  }
  setContext(context) {
    this.context = context;
    return this;
  }

  /**
   *
   * @param  {any} { xslt_file, model, email_to, mail_title, language }
   * @return {void} 
   * @memberof MailSender
   */
  async mailSend({ xslt_file, model, email_to, mail_title, language }) {
    let templateMOdel = {};
    let bodyXml = ''//await this.configServiceDI.setContext(this.context).getByName({ name: xslt_file })
    let title = ''//await this.configServiceDI.setContext(this.context).getByName({ name: mail_title, lang: language })
    let color = ''//await this.configServiceDI.setContext(this.context).getByName({ name: 'MAIL_COLOR' })
    let logo = ''//await this.configServiceDI.setContext(this.context).getByName({ name: 'LOGO_LINK' })
    let base_url = ''//await this.configServiceDI.setContext(this.context).getByName({ name: 'BASE_URL' })
    let mail_template = ''//await this.configServiceDI.setContext(this.context).getByName({ name: 'MAIL_TEMPLATE' })
    let results = await this.configServiceDI.setContext(this.context).getByNames({ names: [xslt_file, mail_title, 'MAIL_COLOR', 'LOGO_LINK', 'BASE_URL', 'MAIL_TEMPLATE'], lang: language })
    results.forEach(item => {
      if (item.name == xslt_file) { bodyXml = item.body }
      else if (item.name == mail_title) { title = item.body }
      else if (item.name == 'MAIL_COLOR') { color = item.body }
      else if (item.name == 'LOGO_LINK') { logo = item.body }
      else if (item.name == 'BASE_URL') { base_url = item.body }
      else if (item.name == 'MAIL_TEMPLATE') { mail_template = item.body }
    })

    let templateTranslate = Array.from(new Set(mail_template.match(/(#TRAN_)\w*#/g)))
    if (templateTranslate.length > 0) {
      let results = await this.configServiceDI.setContext(this.context).getByNames({ names: templateTranslate, lang: language })

      results.forEach((item) => {
        mail_template = mail_template.replace(new RegExp(item.name, "g"), item.body);
      })
    }

    templateTranslate = Array.from(new Set(bodyXml.match(/(#TRAN_)\w*#/g)))
    if (templateTranslate.length > 0) {
      let results = await this.configServiceDI.setContext(this.context).getByNames({ names: templateTranslate, lang: language })

      results.forEach((item) => {
        bodyXml = bodyXml.replace(new RegExp(item.name, "g"), item.body);
      })
    }
    templateMOdel.color = color;
    templateMOdel.logo = logo;
    templateMOdel.base_url = base_url;
    //let xslt = this.readXSLT({ xslt_file, language });
    let bodyMail = await this.xsltToHtml({ xslt: bodyXml, xml: json2xml(model) });
    mail_template = mail_template.replace('#body#', bodyMail)
    let body = await this.xsltToHtml({ xslt: mail_template, xml: json2xml(templateMOdel) });
    const htmlOutput = mjml2html(body, { minify: true })
    return await this.send({ email_to, language, mail_title: title, body: htmlOutput.html });
  }

  /**
   *
   * @param  {any} xslt_file
   * @param  {any} language
   * @return
   * @memberof MailSender
   */
  readXSLT({ xslt_file, language }) {
    return fs.readFileSync(`${CONFIG.PATH.mails}${xslt_file}.${language}.xslt`);
  }

  /**
   *
   * @param  {any} { xml, xslt }
   * @return
   * @memberof MailSender
   */
  xsltToHtml({ xml, xslt }) {
    let xmlResult = xsltProcess.xmlParse(xml);
    let xsltResult = xsltProcess.xmlParse(xslt.toString());
    let xsltHtml = xsltProcess.xsltProcess(xmlResult, xsltResult);
    return xsltHtml;
  }

  /**
   *
   * @param  {any} { email_to, language, mail_title, body }
   * @return {void}@memberof MailSender
   */
  async send({ email_to, language, mail_title, body }) {
    let port = ''//await this.configServiceDI.setContext(this.context).getByName({ name: 'SMTP_PORT' })
    let secure = ''//await this.configServiceDI.setContext(this.context).getByName({ name: 'SMTP_SECURE' })
    let password = ''//await this.configServiceDI.setContext(this.context).getByName({ name: 'SMTP_PASSWORD' })
    let host = ''//await this.configServiceDI.setContext(this.context).getByName({ name: 'SMTP_HOST' })
    let login = ''//await this.configServiceDI.setContext(this.context).getByName({ name: 'SMTP_MAIL' })
    let from = ''//await this.configServiceDI.setContext(this.context).getByName({ name: 'SMTP_NAME' })
    let sendGrid = undefined
    let results = await this.configServiceDI.setContext(this.context).getByNames({ names: ['SMTP_PORT', 'SMTP_SECURE', 'SMTP_PASSWORD', 'SMTP_HOST', 'SMTP_MAIL', 'SMTP_NAME', 'SMTP_SENDGRID_KEY'], lang: "" })
    results.forEach(item => {
      if (item.name == 'SMTP_PORT') { port = item.body }
      else if (item.name == 'SMTP_SECURE') { secure = item.body }
      else if (item.name == 'SMTP_PASSWORD') { password = item.body }
      else if (item.name == 'SMTP_HOST') { host = item.body }
      else if (item.name == 'SMTP_MAIL') { login = item.body }
      else if (item.name == 'SMTP_NAME') { from = item.body }
      else if (item.name == 'SMTP_SENDGRID_KEY') { sendGrid = item.body }
    })

    // create reusable transporter object using the default SMTP transport

    let transporter = undefined
    if (sendGrid) {

      transporter = nodemailer.createTransport(nodemailerSendgrid({
        apiKey: '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'
      }));
    } else {
      transporter = nodemailer.createTransport(smtpTransport({
        host: host,
        port: port,
        maxConnections: 6,
        pool: true,
        authMethod: 'PLAIN',
        secureConnection: true,
        secure: true,

        // size: 100000000, // true for 465, false for other ports
        auth: {
          user: login, // generated ethereal user
          pass: password // generated ethereal password
        }

      }));
    }// setup email data with unicode symbols

    //let str = new String(body);
    let mailOptions = {
      from: from, // sender address
      to: email_to, // list of receivers
      subject: mail_title, // Subject line
      html: body,
      encoding: 'base64',
      textEncoding: 'base64',
      // headers: {
      //   'X-Laziness-level': 1000
      //  }
    };
    let prom = new Promise((res, rej) => {
      // send mail with defined transport object
      transporter.sendMail(mailOptions, function (error, info) {
        transporter.close();

        if (error) {
          console.log(error);
          throw new ServerException().throw({
            type: "ERROR",
            code: "EMAIL_EXCEPTION",
            error: error
          });
        }
        console.log(JSON.stringify(info));
        console.log('Message sent: ' + info.response);
        res()


      });
    })
    await prom;

  }
}

("use strict");

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
