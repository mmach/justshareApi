
import SequelizeDB from '../../Database/models/index.js';
import Axios from 'axios';
import CONFIG from '../../config.js';

export const itemSync = async (msg) => {
  // throw msg;
  //   var secs = msg.content.toString().split('.').length - 1;
  let obj = JSON.parse(msg.content.toString());
  console.log(obj.id)
  try {
    if (['I'].includes(obj.es_operations)) {
      try {
        await Axios({
          method: 'post',
          url: `${CONFIG.ELASTIC_SEARCH.production}${String(obj.project_id).toLowerCase()}-items/_doc/${obj.id}`,
          data: obj.data
        })
        console.log('OK')
        await SequelizeDB.Item.update({
          is_elastic_sync: 1
        }, {
          where: {
            id: obj.id,
            project_id: obj.project_id,
          }
        }
        )

        global.queueChannel.ack(msg);


        console.log(" [x] Received DONE");
      } catch (er) {
        console.log(er.response.data.error);
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
    } else if (obj.es_operations == 'U') {
      try {
        await Axios({
          method: 'POST',
          url: `${CONFIG.ELASTIC_SEARCH.production}${String(obj.project_id).toLowerCase()}-items/_update/${obj.id}`,
          data: { "doc": obj.data }
        })
        console.log('OK')

        global.queueChannel.ack(msg);

        console.log(" [x] Received DONE");
      } catch (er) {
        console.log(er)

        global.queueChannel.nack(msg);

      }


    } else if (obj.es_operations == 'D') {
      try {
        await Axios({
          method: 'DELETE',
          url: `${CONFIG.ELASTIC_SEARCH.production}${String(obj.project_id).toLowerCase()}-items/_doc/${obj.id}?refresh`,
          data: obj.data
        })
        console.log('OK')

        global.queueChannel.ack(msg);

        console.log(" [x] Received DONE");
      } catch (er) {
        console.log(er)

        global.queueChannel.nack(msg);

      }
    } else {
      global.queueChannel.ack(msg);
    }
  } catch (err) {
    console.log(err)
  }
  // console.log(" [x] Received %s", msg.content.toString());

}



