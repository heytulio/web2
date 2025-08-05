const { Aluno } = require("../models/aluno");
const { Disciplina } = require("../models/disciplina");
const { AlunoDisciplina } = require("../models/alunoDisciplina");

module.exports = {
  async alocar(req, res) {
    try {
      const { aluno, disciplina, frequencia } = req.body;

      const novaRelacao = new AlunoDisciplina({
        aluno,
        disciplina,
        frequencia,
      });

      const salva = await novaRelacao.save();
      res.status(201).json(salva);
    } catch (error) {
      res
        .status(400)
        .json({ erro: "Erro ao alocar disciplina", detalhes: error.message });
    }
  },

  async desalocar(req, res) {
    try {
      const { aluno, disciplina } = req.body;

      const deletada = await AlunoDisciplina.findOneAndDelete({
        aluno,
        disciplina,
      });
      console.log("Relação deletada:", deletada);

      if (!deletada)
        return res.status(404).json({ erro: "Relação não encontrada" });

      res
        .status(200)
        .json({ mensagem: "Disciplina desalocada do aluno com sucesso" });
    } catch (error) {
      console.error("Erro ao desalocar:", error);
      res.status(400).json({
        erro: "Erro ao desalocar disciplina",
        detalhes: error.message,
      });
    }
  },

  async listarDisciplinasPorMatricula(req, res) {
    try {
      const matricula = req.params.matricula;
      console.log("Matrícula recebida:", matricula);

      const aluno = await Aluno.findOne({ matricula: matricula });
      if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado" });

      const relacoes = await AlunoDisciplina.find({
        aluno: aluno._id,
      }).populate("disciplina");
      res.status(200).json(relacoes.map((r) => r.disciplina));
    } catch (error) {
      console.error(error);
      res.status(400).json({
        erro: "Erro ao buscar disciplinas por matrícula",
        detalhes: error.message,
      });
    }
  },
};
