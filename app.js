// Carregando modulos
const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const admin = require('./routes/admin');
//const mongoose = require('mongoose')

//Configurações
// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// Mongoose
// Em Breve
// Rotas
app.use('/admin', admin);
// Outros
const PORT = 8081;
app.listen(PORT, () => {
  console.log('Servidor Rodando!');
});
//teste
