const router = require("express").Router();

const alunoRouter = require("./alunos");
const disciplinaRouter = require("./disciplinas");
const alunoDisciplinaRouter = require("./alunoDisciplina");
const loginRouter = require("./login");

router.use(disciplinaRouter);
router.use(alunoDisciplinaRouter);
router.use(alunoRouter);
router.use(loginRouter);

module.exports = router;
