const express = require("express");
let ejs = require("ejs");
const data = require("./data/sigaa.json");

const app = express();
const port = 3000;

//Informa que o express deve converter automaticamente o corpo requisições e respostas para JSON
app.use(express.json());

// Informa o template engine que será utilizado
app.set("view engine", "ejs");
// Informa o diretório onde estão os arquivos de visualização
app.set("views", "./views");

// Rota de Leitura
app.get("/", (req, res) => {
  res.render("index", { alunos: data.alunos, professores: data.professores });
});

app.get("/alunos", (req, res) => {
  res.status(200).json(data.alunos);
});

app.get("/alunos/:id", (req, res) => {
  const id = req.params.id;
  const aluno = buscarAluno(id);

  if (aluno !== -1) {
    res.status(200).json(data.alunos[aluno]);
  } else {
    res.status(404).send("Aluno não encontrado!");
  }
});

app.get("/professores", (req, res) => {
  res.status(200).json(data.professores);
});

app.get("/professores/:id", (req, res) => {
  const id = req.params.id;
  const professor = buscarProfessor(id);

  if (professor !== -1) {
    res.status(200).json(data.professores[professor]);
  } else {
    res.status(404).send("Professor não encontrado!");
  }
});

// Rota de Criação
app.post("/alunos", (req, res) => {
  const novoAluno = {
    matricula: req.body.matricula,
    nome: req.body.nome,
    email: req.body.email,
    curso: req.body.curso,
  };

  data.alunos.push(novoAluno);
  res.status(200).json(novoAluno);
});

app.post("/professores", (req, res) => {
  const novoProfessor = {
    matricula: req.body.matricula,
    nome: req.body.nome,
    departamento: req.body.departamento,
  };

  data.professores.push(novoProfessor);
  res.status(200).json(novoProfessor);
});

// Rota de Atualização
app.put("/alunos/:id", (req, res) => {
  const id = req.params.id;
  const aluno = buscarAluno(id);

  if (aluno !== -1) {
    data.alunos[aluno].matricula = req.body.matricula;
    data.alunos[aluno].nome = req.body.nome;
    data.alunos[aluno].email = req.body.email;
    data.alunos[aluno].curso = req.body.curso;

    res.status(200).json(data.alunos[aluno]);
  } else {
    res.status(404).send("Aluno não encontrado!");
  }
});

app.put("/professores/:id", (req, res) => {
  const id = req.params.id;
  const professor = buscarProfessor(id);

  if (professor !== -1) {
    data.professores[professor].matricula = req.body.matricula;
    data.professores[professor].nome = req.body.nome;
    data.professores[professor].departamento = req.body.departamento;

    res.status(200).json(data.professores[professor]);
  } else {
    res.status(404).send("Professor não encontrado!");
  }
});

// Rota de Exclusão
app.delete("/alunos/:id", (req, res) => {
  const id = req.params.id;
  const aluno = buscarAluno(id);

  if (aluno !== -1) {
    data.alunos.splice(aluno, 1);
    res.status(200).send("Aluno excluído com sucesso!");
  } else {
    res.status(404).send("Aluno não encontrado!");
  }
});

app.delete("/professores/:id", (req, res) => {
  const id = req.params.id;
  const professor = buscarProfessor(id);

  if (professor !== -1) {
    data.professores.splice(professor, 1);
    res.status(200).send("Professor excluído com sucesso!");
  } else {
    res.status(404).send("Professor não encontrado!");
  }
});

function buscarAluno(id) {
  return data.alunos.findIndex((aluno) => aluno.id == id);
}

function buscarProfessor(id) {
  return data.professores.findIndex((professor) => professor.id == id);
}

app.listen(port, () => {
  console.log(`Server rodando na porta: ${port}`);
});

// Print a data de hoje
console.log(new Date().toLocaleDateString());

// Some de 1 até 1000 com loop
