
let CONFIG = {
  FRONT_END_URL: "http://www.onet.pl",
  PATH: {
    mails: "./Static/MailsXSLT/"
  },
  UPLOADED_TYPE: [
    "image/png", "image/jpeg"
  ],
  UPLOAD_PATH: "C:/Programowanie/Private/stuffshare/src/JustShareApi/upload",//"F:/Private/cqrs-node/upload",//
  LOCATION_IQ: "fcfb9eb913b786",
  ELASTIC_SEARCH: {
    production: "https://5gn69lkoe1:e53lt3rgsr@alder-283162757.eu-west-1.bonsaisearch.net:443/",//"https://search-justshare-elastic-duvzgnhy7vsbtdpuqtv3s2v4qa.us-east-2.es.amazonaws.com/",
    development: "https://5gn69lkoe1:e53lt3rgsr@alder-283162757.eu-west-1.bonsaisearch.net:443/"//"http://localhost:9200/"//"https://25t337e5fo:xdrzi9s9z@oak-487876355.eu-west-1.bonsaisearch.net:443/"
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
      login: "stuffshare@apptruth.pl",
      password: "testtest123"
    },
    LOGIN: {
      FACEBOOK: {},
      GOOGLE: {}
    }
  }
};

export default CONFIG;
