const { Disciplina } = require("../models/disciplina");

module.exports = {
  async create(req, res) {
    try {
      const novaDisciplina = new Disciplina(req.body);
      const salva = await novaDisciplina.save();
      res.status(201).json(salva);
    } catch (error) {
      res
        .status(400)
        .json({ erro: "Erro ao criar disciplina", detalhes: error.message });
    }
  },

  async readAll(req, res) {
    try {
      const disciplinas = await Disciplina.find();
      res.status(200).json(disciplinas);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar disciplinas" });
    }
  },

  async readOne(req, res) {
    try {
      const disciplina = await Disciplina.findById(req.params.id);
      if (!disciplina)
        return res.status(404).json({ erro: "Disciplina não encontrada" });
      res.status(200).json(disciplina);
    } catch (error) {
      res.status(400).json({ erro: "ID inválido" });
    }
  },

  async update(req, res) {
    try {
      const atualizada = await Disciplina.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!atualizada)
        return res.status(404).json({ erro: "Disciplina não encontrada" });
      res.status(200).json(atualizada);
    } catch (error) {
      res.status(400).json({ erro: "Erro ao atualizar disciplina" });
    }
  },

  async delete(req, res) {
    try {
      const removida = await Disciplina.findByIdAndDelete(req.params.id);
      if (!removida)
        return res.status(404).json({ erro: "Disciplina não encontrada" });
      res.status(200).json({ mensagem: "Disciplina removida com sucesso" });
    } catch (error) {
      res.status(400).json({ erro: "Erro ao deletar disciplina" });
    }
  },
};
