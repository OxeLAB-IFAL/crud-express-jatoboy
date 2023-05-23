var express = require('express')
var router = express.Router();
var data = require('../data/sigaa.json');

router.get('/', (req, res) => {
    res.status(200).json(data.alunos);
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const aluno = buscarAluno(id);
  
    if (aluno !== -1) {
      res.status(200).json(data.alunos[aluno]);
    } else {
      res.status(404).send("Aluno não encontrado!");
    }
})

router.post('/', (req, res) => {
    const novoAluno = {
        matricula: req.body.matricula,
        nome: req.body.nome,
        email: req.body.email,
        curso: req.body.curso,
      };
    
      data.alunos.push(novoAluno);
      res.status(200).send("Aluno cadastrado com sucesso!");    
})

router.put('/:id', (req, res) => {
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
  
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const aluno = buscarAluno(id);
    
    if (aluno !== -1) {
      data.alunos.splice(aluno, 1);
      res.status(200).send("Aluno excluído com sucesso!");
    } else {
      res.status(404).send("Aluno não encontrado!");
    }  
})

function buscarAluno(id) {
    return data.alunos.findIndex((aluno) => aluno.id == id);
  }  

module.exports = router;