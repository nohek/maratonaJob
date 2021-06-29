const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");

//USANDO TEMPLATE ENGINE
server.set("view engine", "ejs");

//mudar a localização da pasta views
server.set("views", path.join(__dirname, "views"));

//HABILITAR ARQUIVOS ESTATICOS
server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));

server.use(routes);

server.listen(3000, () => console.log("rodando"));
