export const DBConfig = {
  "development": {
    "host": "mappsdb.database.windows.net",
    "username": "mapps",
    "password": "Crunum123",
    "database": "mappsDB",
    "encrypt": true,
    "logging": false,
    "dialect": "mssql",
    "dialectOptions": {
      "encrypt": true,
      "requestTimeout": 300000,
      "options": {
        "requestTimeout": 300000,
        "encrypt": true
      }
    },
    "define": {
      "logging": false,
      "underscored": true
    }
  },
  "test": {
    "username": "stuffshare",
    "password": "stuffshare",
    "dialect": "mssql",
    "dialectOptions": {
      "requestTimeout": 300000,
      "options": {
        "requestTimeout": 300000
      },
      "connectionString": "Server=localhost\\SQLEXPRESS;Database=stuffShareDB;Trusted_Connection=yes;"
    },
    "define": {
      "underscored": true
    }
  },
  "production": {
    "host": "mappsdb.database.windows.net",
    "username": "mapps",
    "password": "Crunum123",
    "database": "mappsDB",
    "encrypt": true,
    "logging": false,
    "dialect": "mssql",
    "dialectOptions": {
      "encrypt": true,
      "requestTimeout": 300000,
      "options": {
        "requestTimeout": 300000,
        "encrypt": true
      }
    },
    "define": {
      "logging": false,
      "underscored": true
    }
  }
}