const { Usuario } = require("../models/usuario.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async login(req, res) {
    const { email } = req.body;
    try {
      const usuario = await Usuario.findOne({ email }).select("+senha");
      if (!usuario)
        return res.status(401).json({
          status: "falhou",
          data: [],
          message: "Email ou Senha incorretos. tente novamente ?iuqa",
        });

      const isPasswordValid = await bcrypt.compare(
        `${req.body.senha}`,
        usuario.senha
      );

      if (!isPasswordValid)
        return res.status(401).json({
          status: "falha",
          data: [],
          message: "Email ou Senha incorretos. tente novamente aqui?",
        });

      let options = {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };

      const token = usuario.generateAcessJWT();
      res.cookie("SessionID", token, options);

      const { senha, ...user_data } = usuario._doc;

      res.status(200).json({
        status: "success",
        data: [user_data],
        message: "Login concluido",
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        code: 500,
        data: [],
        message: "Internal Server Error",
      });
    }
  },

  async autenticar(req, res) {
    try {
      const usuario = await Usuario.findById(req.userId).select("-senha");
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
      res.status(200).json({
        status: "success",
        data: [usuario],
        message: "Usuário autenticado.",
      });
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  },

  async logoff(req, res) {
    res.clearCookie("SessionID");
    res
      .status(200)
      .json({ status: "success", message: "Logoff realizado com sucesso." });
  },

  async registrar(req, res) {
    const { email, senha } = req.body;
    try {
      const existe = await Usuario.findOne({ email });
      if (existe) {
        return res.status(400).json({
          status: "falhou",
          data: [],
          msg: "Email já registrado",
        });
      }

      const novoUsuario = new Usuario({ email, senha });
      const salvo = await novoUsuario.save();

      const { senha: _, ...user_data } = salvo._doc;
      return res.status(201).json({
        status: "sucesso",
        data: [user_data],
        msg: "Usuário cadastrado com sucesso",
      });
    } catch (err) {
      console.error("Erro ao registrar usuário:", err);
      return res.status(500).json({
        status: "erro",
        code: 500,
        data: [],
        msg: "Erro interno no servidor",
      });
    }
  },
};
