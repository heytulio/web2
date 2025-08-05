const router = require("express").Router();
const disciplinaController = require("../controllers/disciplinaController");

router
  .route("/disciplinas")
  .post((req, res) => disciplinaController.create(req, res));
router
  .route("/disciplinas/all")
  .get((req, res) => disciplinaController.readAll(req, res));
router
  .route("/disciplinas/:id")
  .get((req, res) => disciplinaController.readOne(req, res));
router
  .route("/disciplinas/edit/:id")
  .post((req, res) => disciplinaController.update(req, res));
router
  .route("/disciplinas/delete/:id")
  .post((req, res) => disciplinaController.delete(req, res));

module.exports = router;
