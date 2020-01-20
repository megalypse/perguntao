const sequelize = require("sequelize");
const connection = require("./database");

const Question = connection.define("perguntas", {
    titulo: {
        type: sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: sequelize.TEXT,
        allowNull: false
    }
});

Question.sync({force: false})
        .then(() => {
            console.log("Tabela 'perguntas' inicializada com sucesso!");
        })
        .catch((erro) => {
            console.log(`Erro na criação da tabela: ${erro}`);
        })

module.exports = Question;