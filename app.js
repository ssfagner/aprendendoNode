// Carregando modulos
const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const admin = require('./routes/admin');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
require('./models/Postagem');
const Postagem = mongoose.model('postagem');

//Configurações
//Sessão
app.use(
  session({
    secret: 'cursodenode',
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(flash());
//Middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});
// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// Mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost/blogapp')
  .then(() => {
    console.log('Conectado ao mongo');
  })
  .catch((err) => {
    console.log('Erro ao se conectar' + err);
  });
// Public
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.get('/', (req, res) => {
  Postagem.find()

    .populate('categoria')
    .sort({ data: 'desc' })
    .lean()
    .then((postagens) => {
      res.render('index', { postagens: postagens });
    })
    .catch((err) => {
      req.flash('error_msg', 'Houve um erro ao carregar as postagens');
      res.redirect('/404');
    });
});

app.get('/404', (req, res) => {
  res.send('Erro 404!');
});

app.get('/posts', (req, res) => {
  res.send('Lista Posts');
});
app.use('/admin', admin);
// Outros
const PORT = 8081;
app.listen(PORT, () => {
  console.log('Servidor Rodando!');
});
