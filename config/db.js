const { Sequelize } = require("sequelize"); ;

const createDB = new Sequelize("url_shortener", "bashir", "test123", {
  dialect: "sqlite",
  host: "./config/db.sqlite",
});

module.exports = createDB;
