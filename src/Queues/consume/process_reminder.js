
import SequelizeDB from '../../Database/models/index.js';
import Axios from 'axios';
import CONFIG from '../../config.js';
import jwt from "jsonwebtoken";
import fs from 'fs'

export const processReminder = async (msg) => {
  // throw msg;
  //   var secs = msg.content.toString().split('.').length - 1;
  let obj = JSON.parse(msg.content.toString());

  try {
    console.log('OK')
    let cert = fs.readFileSync("./cert.key");

    let projectToken = jwt.sign(
      {
        id: String(obj.project_id).toLowerCase(),
        user_id: '2d0518f9-1633-4faf-ab71-2985fe8749f5'
      },
      cert.toString("utf8"),
      { expiresIn: CONFIG.SECURITY.TOKEN_EXPIRATION }
    )
    let token = jwt.sign(
      {
        uid: 'faafe9b1-064f-402b-ab75-474164bbd866'
      },
      cert.toString("utf8"),
      { expiresIn: CONFIG.SECURITY.TOKEN_EXPIRATION }
    )

    await Axios({
      method: 'post',
      url: `http://localhost:1337/command`,
      headers: {
        ProjectAuthorization: `Bearer ${projectToken}`,
        Authorization: `Bearer ${token}`

      },
      data: {
        action: 'invokeProcessCommand',
        model: {
          process_id: obj.process_id,
          chain_id: obj.process_chain_id,
          process_model: {
            item_id: obj.item_id,
            id: obj.item_id,
            iua_id:obj.iua_id

          }
        }
      }
    })
    global.queueChannel.ack(msg);


    console.log(" [x] Received DONE");
  } catch (er) {
    if (!obj.retry || obj.retry < 5) {

      console.log(obj.retry)
      obj.retry = obj.retry ? obj.retry + 1 : 1
      global.queueChannel.publish(CONFIG.ITEM_ES_QUEUE, obj.project_id,
        obj
        , {
          contentType: 'application/json', persistent: true, expiration: 500 * 1000, headers: {
            //    Authorization: 'Bearer ' + this.context.token,
            //    ProjectAuthorization: 'Bearer ' + this.context.projectToken
          }
        }
      );
      //setInterval(()=>{

    }
    global.queueChannel.ack(msg);

    //setInterval(()=>{
    // global.queueChannel.nack(msg, true, true);
    //},10000)
  }


  // console.log(" [x] Received %s", msg.content.toString());

}



