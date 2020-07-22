import amqp from 'amqp-connection-manager';
import { onReadMessage } from './consume/msg_readed.js'
import { onSendMessage } from './consume/new_message.js'
import CONFIG from '../config.js';
import SequelizeDB from '../Database/models/index.js';
import {itemSync} from './consume/item_sync.js'

let amqpFunc = async () => {
    console.log(process.env.amqp)
    var connection = amqp.connect([process.env.AMQP ? process.env.AMQP : CONFIG.MQRABBIT.link]);

    let obj = await SequelizeDB.Project.findAll();
    // console.log(obj)
    let projects = obj;


    console.log('connected')
    const QUEUE_NAME = 'items-es-sync-'
    const MSG_QUEUE_NAME = 'chat-message-queue-'
    const MSG_READ_QUEUE_NAME = 'chat-message-read-'

    const EXCHANGE_NAME = CONFIG.ITEM_ES_QUEUE;
    const EXCHANGE_MSG_QUEUE_NAME = CONFIG.CHAT_QUEUE;
    const EXCHANGE_CHAT_READ_QUEUE = CONFIG.CHAT_READ_QUEUE;

    connection.on('connect', () => console.log('Connected!'));
    connection.on('disconnect', err => console.log('Disconnected.', err));

    global.queueChannel = connection.createChannel({
        json: true,
        setup: async channel => {
            // `channel` here is a regular amqplib `ConfirmChannel`.

            channel.assertExchange(EXCHANGE_NAME, 'topic');
            channel.assertExchange(EXCHANGE_MSG_QUEUE_NAME, 'topic');
            channel.assertExchange(EXCHANGE_CHAT_READ_QUEUE, 'topic');

            let channels = projects.map(proj => {
                let i = proj.dataValues
                return Promise.all([
                    channel.assertQueue(QUEUE_NAME + i.id, { durable: true, autoDelete: true }),
                    channel.prefetch(1),
                    channel.bindQueue(QUEUE_NAME + i.id, EXCHANGE_NAME, i.id),
                    channel.consume(QUEUE_NAME + i.id, itemSync),
                    channel.assertQueue(MSG_QUEUE_NAME + i.id, { durable: true, autoDelete: true }),
                    channel.bindQueue(MSG_QUEUE_NAME + i.id, EXCHANGE_MSG_QUEUE_NAME, i.id),
                    channel.consume(MSG_QUEUE_NAME + i.id, onSendMessage),
                    channel.assertQueue(MSG_READ_QUEUE_NAME + i.id, { durable: true, autoDelete: true }),
                    channel.bindQueue(MSG_READ_QUEUE_NAME + i.id, EXCHANGE_CHAT_READ_QUEUE, i.id),
                    channel.consume(MSG_READ_QUEUE_NAME + i.id, onReadMessage)
                ])
            })
            return Promise.all([
                ...channels
            ])
        }
    });
    // function sendMessage() {
    //  global.queueChannel.publish(EXCHANGE_NAME, "24823D31-43D5-4B08-ACAA-8AEF78484FD6", { time: Date.now() }, { contentType: 'application/json', persistent: true })
    //  .then(function () {
    //   console.log("Message sent");
    //    setTimeout(() => {
    // sendMessage()
    //     }, 1)
    //  })

    // };
    global.queueChannel.waitForConnect()
        .then(function () {
            console.log("Listening for messages");
        });
    //sendMessage()
}

module.exports = { amqpFunc }