const router = require("express").Router();
const loginController = require("../controllers/loginController");
const Validate = require("../middleware/Validate");
const { check } = require("express-validator");
const Verify = require("../middleware/Verify");

router
  .route("/login")
  .post(
    [
      check("email")
        .isEmail()
        .withMessage("Insira um email valido")
        .normalizeEmail(),
      check("senha").notEmpty().isLength({ min: 8 }),
      Validate,
    ],
    (req, res) => loginController.login(req, res)
  );

router
  .route("/login/autenticar")
  .get(Verify, (req, res) => loginController.autenticar(req, res));

router
  .route("/login/logoff")
  .post((req, res) => loginController.logoff(req, res));

router
  .route("/login/registrar")
  .post(
    [
      check("email")
        .isEmail()
        .withMessage("Insira um email valido")
        .normalizeEmail(),
      check("senha")
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("Insira uma senha valida com 8 digitos"),
      Validate,
    ],
    (req, res) => loginController.registrar(req, res)
  );

module.exports = router;
