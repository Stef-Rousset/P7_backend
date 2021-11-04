require('dotenv').config();
const dbPassword = process.env.DBPASSWORD;
const dbUserName = process.env.DBUSERNAME;
const dbName = process.env.DBNAME;
module.exports = {
    "development": {
        "username": `${dbUserName}`,
        "password": `${dbPassword}`,
        "database": `${dbName}`,
        "host": "localhost",
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
      "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}
