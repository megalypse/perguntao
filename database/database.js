const Sequelize = require("sequelize");

const user = "root";
const pswd = "your_user_password";
const connection = new Sequelize("perguntão", user, pswd, {
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;
