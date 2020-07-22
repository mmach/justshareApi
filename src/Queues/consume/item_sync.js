
import SequelizeDB from '../../Database/models/index.js';
import Axios from 'axios';

const itemSync = async (msg) => {
  // throw msg;
  //   var secs = msg.content.toString().split('.').length - 1;
  let obj = JSON.parse(msg.content.toString());
  console.log(obj.id)

  if (['I'].includes(obj.es_operations)) {
    try {
      await Axios({
        method: 'post',
        url: `https://search-justshare-es-prpllmtm2nibj3jnky5rdtjfga.us-east-2.es.amazonaws.com/${String(obj.project_id).toLowerCase()}-items/_doc/${obj.id}?refresh`,
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
      console.log(er)
      global.queueChannel.nack(msg);

    }
  } else if (obj.es_operations == 'U') {
    try {
      await Axios({
        method: 'post',
        url: `https://search-justshare-es-prpllmtm2nibj3jnky5rdtjfga.us-east-2.es.amazonaws.com/${String(obj.project_id).toLowerCase()}-items/_update/${obj.id}?refresh`,
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
      console.log(er)

      global.queueChannel.nack(msg);

    }


  } else if (obj.es_operations == 'D') {
    try {
      await Axios({
        method: 'DELETE',
        url: `https://search-justshare-es-prpllmtm2nibj3jnky5rdtjfga.us-east-2.es.amazonaws.com/${String(obj.project_id).toLowerCase()}-items/_doc/${obj.id}?refresh`,
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
      console.log(er)

      global.queueChannel.nack(msg);

    }
  } else {
    global.queueChannel.ack(msg);
  }
  // console.log(" [x] Received %s", msg.content.toString());

}



module.exports = { itemSync }
