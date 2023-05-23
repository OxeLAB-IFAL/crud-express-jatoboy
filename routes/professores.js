var express = require('express');
var router = express.Router();
var data = require('../data/sigaa.json')

router.get('/', (req, res) => {
    res.status(200).json(data.professores);
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const professor = buscarProfessor(id);
  
    if (professor !== -1) {
      res.status(200).json(data.professores[professor]);
    } else {
      res.status(404).render('404', {entity: 'Professor'})
    }  
})

router.post('/', (req, res) => {
    const novoProfessor = {
        id: data.professores.length + 1,
        matricula: req.body.matricula,
        nome: req.body.nome,
        departamento: req.body.departamento,
      };
    
      data.professores.push(novoProfessor);
      res.redirect('/')  
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const professor = buscarProfessor(id);
  
    if (professor !== -1) {
      data.professores[professor].matricula = req.body.matricula;
      data.professores[professor].nome = req.body.nome;
      data.professores[professor].departamento = req.body.departamento;
  
      res.status(200).json(data.professores[professor]);
    } else {
      res.status(404).render('404', {entity: 'Professor'})
    }  
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const professor = buscarProfessor(id);
  
    if (professor !== -1) {
      data.professores.splice(professor, 1);
      res.status(200).send("Professor excluído com sucesso!");
    } else {
      res.status(404).render('404', {entity: 'Professor'})
    }  
})

function buscarProfessor(id) {
    return data.professores.findIndex((professor) => professor.id == id);
  }  

module.exports = router;