const dbConfig = require("../config/db.config");
const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect
    })

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Model = require("./data")(sequelize, DataTypes);

module.exports = db;