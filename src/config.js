
let CONFIG = {
  FRONT_END_URL: "http://www.onet.pl",
  PATH: {
    mails: "./Static/MailsXSLT/"
  },
  TRANSLATE:{
    engine:'deepl',
    key:'9f3f14a8-919f-18d9-55bb-1b5ee846062d:fx'
  },
  ITEM_ES_QUEUE: 'elasticsearch-items',
  CHAT_QUEUE: 'chat-messages',
  CHAT_READ_QUEUE: 'chat-read-message',
  REMINDER_QUEUE: 'reminder-process-message',
  UPLOADED_TYPE: [
    "image/png", "image/jpeg"
  ],
  UPLOAD_PATH: "C:/Repos/Private/mapps-io-api/upload",//"F:/Private/cqrs-node/upload",//
  LOCATION_IQ: "fcfb9eb913b786",
  TRANSLATE: {
    engine: 'yandex',
    key: 'trnsl.1.1.20190525T222610Z.47a7d82b340b189e.59764ef074ae84f21bed0836d101d4743a754577'
  },
  MQRABBIT: {
    link: 'amqps://ryryeucm:DQ_S4Z6FV8IrIaZbZyFbWj6jMOwLXmX7@whale.rmq.cloudamqp.com/ryryeucm'
  },
  BLOB_LINK: "https://mapps-io-blobs-70614ccb13bf.herokuapp.com/",
  ELASTIC_SEARCH: {
    production: "https://sktbk2743u:6hrjwg7k7b@boxwood-690045999.eu-west-1.bonsaisearch.net:443/",//"https://search-justshare-es-prpllmtm2nibj3jnky5rdtjfga.us-east-2.es.amazonaws.com/",//"https://search-justshare-elastic-duvzgnhy7vsbtdpuqtv3s2v4qa.us-east-2.es.amazonaws.com/",
    development: "https://sktbk2743u:6hrjwg7k7b@boxwood-690045999.eu-west-1.bonsaisearch.net:443/"//"https://search-justshare-es-prpllmtm2nibj3jnky5rdtjfga.us-east-2.es.amazonaws.com/"//"http://localhost:9200/"//"https://25t337e5fo:xdrzi9s9z@oak-487876355.eu-west-1.bonsaisearch.net:443/"
  },
  JS_CRED: {
    secretKey: 'CEE71DFE-63C2-4755-B449-26355B5DBF04',
    cliendId: '9C4D23EE-898C-49A7-94FC-DDA5596F1F00'
  },
  DATABASE: {
    development: {

      host: "SQL6003.site4now.net",
      username: "DB_A43E8B_stuffshare_admin",
      password: "stuffShare123",
      database: "DB_A43E8B_stuffshare",
      dialect: "mssql",

      define: {

        underscored: true
      }

    },
    test: {
      username: "stuffShare",
      password: "stuffShare",
      dialect: "mssql",
      dialectOptions: {
        connectionString: "Server=localhost\\SQLEXPRESS;Database=stuffShareDB;Trusted_Connection=yes;"
      },
      define: {

        underscored: true
      }

    },
    production: {
      username: "root",
      password: null,
      database: "database_production",
      host: "127.0.0.1",
      dialect: "mysql"
    }
  },
  SECURITY: {
    TOKEN_EXPIRATION: 86400,
    CERT_PATH: "./cert.key",
    SMTP: "ssl0.ovh.net",
    EMAIL: {
      login: "no-reply@justshare.it",
      password: "MiszkaKiszka66"
    },
    LOGIN: {
      FACEBOOK: {},
      GOOGLE: {}
    }
  }
};

export default CONFIG;
