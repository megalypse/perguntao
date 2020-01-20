const Sequelize = require("sequelize");

const user = "root";
const pswd = "369587";
const connection = new Sequelize("perguntão", user, pswd, {
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;