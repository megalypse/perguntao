const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Question = require("./database/Question");
const Answer = require("./database/Answer");

// Database
connection.authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados realizada com sucesso!");
    })
    .catch(erro => {
        console.log(`Conexão com o banco de dados mal sucedida. Erro: ${erro}`);
    })

// View engine
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
app.get("/", (req, res) => {
    Question.findAll({ raw: true, order: [["id", "DESC"]] }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
        console.log(perguntas);

    })

})
app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});
app.get("/perguntas/:id", (req, res) => {
    let id = req.params.id;
    Question.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (!pergunta) {
            res.redirect("/")
        } else {
            Answer.findAll({
                where: { parent: id }
            }).then(resposta => {
                Answer.findAll({raw: true}).then(maxAns => {
                    res.render("pergunta", {
                        titulo: pergunta.titulo,
                        descricao: pergunta.descricao,
                        id: pergunta.id,
                        respostas: resposta,
                        maxAns: maxAns.length
                        
                    })
                })
            })
            // res.render("pergunta", {
            //     titulo: pergunta.titulo,
            //     descricao: pergunta.descricao,
            //     id: pergunta.id
            // })
        }
    })

})

// Post
app.post("/perguntar/saveQ", (req, res) => {
    let titulo = req.body.titulo;
    let pergunta = req.body.pergunta;
    Question.create({
        titulo: titulo,
        descricao: pergunta
    })
        .then(() => {
            Question.findAll({ raw: true }).then(perguntas => {
                res.redirect(`/perguntas/${perguntas.length}`);
            });
        });
});
app.post("/perguntas/deleter", (req, res) => {
    let id = req.body.deleter;
    Question.destroy({
        where: { id: id }
    }).then(() => {
        res.redirect("index");
    })
});
app.post("/perguntas/:id/sendAns", (req, res) => {
    let parentAnswer = req.body.parentAnswer;
    let parentID = req.body.parentID
    Answer.create({
        resposta: parentAnswer,
        parent: parentID
    }).then(() => {
        res.redirect("/perguntas/" + parentID)
    })
});
app.post("/perguntas/:id/delAns", (req, res) => {
    let resID = req.body.delAns;
    let parentID1 = req.params.parentID1;
    Answer.destroy({
        where: {id: resID}
    }).then(() => {
        res.redirect(`/perguntas/${req.params.id}`)
    })
})

const port = 6090;
app.listen(port, (erro) => {
    if (erro) {
        console.log(`Erro detectado: ${erro}`)
    } else {
        console.log(`Servidor iniciado com sucesso no seguinte link: http://localhost:${port}`)
    }
})