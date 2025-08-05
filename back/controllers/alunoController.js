const { Aluno } = require("../models/aluno");

module.exports = {
  async create(req, res) {
    try {
      const novoAluno = new Aluno(req.body);
      const alunoSalvo = await novoAluno.save();
      res.status(201).json(alunoSalvo);
    } catch (error) {
      res
        .status(400)
        .json({ erro: "Erro ao criar aluno", detalhes: error.message });
    }
  },

  async readAll(req, res) {
    try {
      const alunos = await Aluno.find();
      res.status(200).json(alunos);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar alunos" });
    }
  },

  async readOne(req, res) {
    try {
      const aluno = await Aluno.findById(req.params.id);
      if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado" });
      res.status(200).json(aluno);
    } catch (error) {
      res.status(400).json({ erro: "ID inválido" });
    }
  },

  async update(req, res) {
    try {
      const alunoAtualizado = await Aluno.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      if (!alunoAtualizado)
        return res.status(404).json({ erro: "Aluno não encontrado" });
      res.status(200).json(alunoAtualizado);
    } catch (error) {
      res.status(400).json({ erro: "Erro ao atualizar aluno" });
    }
  },

  async delete(req, res) {
    try {
      const alunoDeletado = await Aluno.findByIdAndDelete(req.params.id);
      if (!alunoDeletado)
        return res.status(404).json({ erro: "Aluno não encontrado" });
      res.status(200).json({ mensagem: "Aluno deletado com sucesso" });
    } catch (error) {
      res.status(400).json({ erro: "Erro ao deletar aluno" });
    }
  },
  async getAlunoByMatricula(req, res) {
    try {
      const matricula = req.params.matricula;
      const aluno = await Aluno.findOne({ matricula });
      if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado" });
      res.json(aluno);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },
};
