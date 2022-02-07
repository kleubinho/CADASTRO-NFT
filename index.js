// importar módulo do express
const express = require("express");

// importar módulo do mysql para manipulação
const mysql = require("mysql");

// importar o módulo cors para tratar urls que vem do front
const cors = require("cors");

// Vamos usar o servidor express passando como referência a constante app
const app = express();

// Preparar o servidor para receber dados em formato json ou não
app.use(express.json());

// Aplicar o cors no projeto
app.use(cors());

/* 
Estabelencendo conexão com banco de dados e realizar CRUD na base
*/
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nftproducts",
});

/* Testar e estabelecer conexao com o banco de dados */

connection.connect((erro) => {
  if (erro) {
    console.error("Erro ao tentar estabelecer a conexão " + erro.stack);
    return;
  }
  console.log("Conectado ao banco -> " + connection.threadId);
});

// Teste de rota utilizando a arquitetura http com os verbos GET, POST, PUT e DELETE

// Rota para o método get. para a consulta de dados
app.get("/nfts/list", (req, res) => {
  // consulta sql para selecionar os produtos no banco de dados
  connection.query("select * from product", (erro, resultado) => {
    if (erro) {
      return res
        .status(500)
        .send({ output: "Erro ao tentar consultar :( " + erro });
    }
    res.status(200).send({ output: resultado });
  });
});

// Rota para o método post. para cadastro de dados
app.post("/nft/register", (req, res) => {
  connection.query(
    "insert into product set ?",
    [req.body],
    (erro, resultado) => {
      if (erro) {
        res
          .status(500)
          .send({ output: `Não foi possível cadastrar -> ${erro}` });
        return;
      }
      res.status(201).send({ output: resultado });
    }
  );
});

// Rota para o método put. Apenas para atualizar dados
app.put("/nft/atualizar/:id", (req, res) => {
  connection.query(
    "update product set ? where idnft=?",
    [req.body, req.params.id],
    (erro, resultado) => {
      if (erro) {
        res.status(500).send({
          output: `Não foi possível atualizar os dados :( -> ${erro}`,
        });
        return;
      }
      res.status(200).send({ output: resultado });
    }
  );
});

app.delete("/nft/delete/:id", (req, res) => {
  connection.query(
    "delete from product where idnft = ?",
    [req.params.id],
    (erro, resultado) => {
      if (erro) {
        res
          .status(500)
          .send({ output: `Erro ao tentar apagar o NFT -> ${erro}` });
        return;
      }
      res.status(204).send({ output: resultado });
    }
  );
});

app.listen("5000", () =>
  console.log("Servidor online em: http://localhost:5000 ")
);
