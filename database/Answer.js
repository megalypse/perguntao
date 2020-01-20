const sequelize = require("sequelize");
const connection = require("./database");

const Answer = connection.define("respostas", {
    resposta: {
        type: sequelize.TEXT,
        allowNull: false
    },
    parent: {
        type: sequelize.INTEGER,
        allowNull: false
    }
})

Answer.sync({force: false}).then(() => {
    console.log(`Tabela "respostas" sincronizada com sucesso!`);
}).catch(erro => {
    console.log(`Falha na sincronização com a tabela "respostas": ${erro}`);
    
})

module.exports = Answer;