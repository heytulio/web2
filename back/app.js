//O mapeamento ORM
const express = require("express");
//Acesso via web dos dados
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Chama da string de conexão da base de dados
const conn = require("./database/conn");
conn();

//routes
const routes = require("./routes/router");
app.use("/api", routes);

//Porta de comunicação

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor ativo na porta ${port}`);
});
