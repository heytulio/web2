const router = require("express").Router();
const alunoController = require("../controllers/alunoController");

router.route("/alunos").post((req, res) => alunoController.create(req, res));
router
  .route("/alunos/all")
  .get((req, res) => alunoController.readAll(req, res));
router
  .route("/alunos/:id")
  .get((req, res) => alunoController.readOne(req, res));
router
  .route("/alunos/edit/:id")
  .post((req, res) => alunoController.update(req, res));
router
  .route("/alunos/delete/:id")
  .post((req, res) => alunoController.delete(req, res));
router
  .route("/alunos/matricula/:matricula")
  .get((req, res) => alunoController.getAlunoByMatricula(req, res));

module.exports = router;
