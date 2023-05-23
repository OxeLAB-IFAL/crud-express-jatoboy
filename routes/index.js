var express = require('express');
var router = express.Router();
const data = require("../data/sigaa.json");

router.get('/', (req, res) => {
    res.render("index", { alunos: data.alunos, professores: data.professores });
});

module.exports = router;