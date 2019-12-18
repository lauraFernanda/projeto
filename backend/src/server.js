const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

mongoose.connect('mongodb://laura:laura123@ds149365.mlab.com:49365/lauracoffe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});


mongoose.connection.on('connected', ()=>{
	console.log('Conectado ao banco de dados.');
});

mongoose.connection.on('error', (err)=>{
	console.log('Erro de conexão:' + err);
});

mongoose.connection.on('disconnect',()=>{
	console.log('Banco de dados desconectado.');
});

const server = express();
server.use(cors());
server.use(express.json());

server.use(routes);

server.listen(3000);
