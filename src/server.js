const express = require("express");
const server = express();
const routes = require("./routes");

//USANDO TEMPLATE ENGINE
server.set("view engine", "ejs");

//HABILITAR ARQUIVOS ESTATICOS
server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));

server.use(routes);

server.listen(3000, () => console.log("rodando"));
