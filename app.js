const express = require("express");
let ejs = require("ejs");
const bodyParser = require("body-parser");

var indexRouter = require('./routes/index');
var alunosRouter = require('./routes/alunos');
var professoresRouter = require('./routes/professores');

const app = express();
const port = 3000;

//Informa que o express deve converter automaticamente o corpo requisições e respostas para JSON
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

// Routers
app.use('/', indexRouter);

app.use('/alunos', alunosRouter);

app.use('/professores', professoresRouter);

app.use((req, res) => {
  res.status(404).render('404');
})

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});