const router = require("express").Router();
const alunoDisciplinaController = require("../controllers/alunoDisciplinaController");

router
  .route("/alunodisciplinas/alocar")
  .post((req, res) => alunoDisciplinaController.alocar(req, res));

router
  .route("/alunodisciplinas/desalocar")
  .post((req, res) => alunoDisciplinaController.desalocar(req, res));

router
  .route("/alunos/:matricula/disciplinas")
  .get((req, res) =>
    alunoDisciplinaController.listarDisciplinasPorMatricula(req, res)
  );

module.exports = router;
