const mongoose = require("mongoose");
const { Schema } = mongoose;

const alunoSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    endereco: {
      type: String,
      required: true,
    },
    dataNascimento: {
      type: Date,
      required: true,
    },
    CPF: {
      type: String,
      required: true,
    },
    matricula: {
      type: String,
      required: true,
    },
    telefone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    curso: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Aluno = mongoose.model("Aluno", alunoSchema);
module.exports = {
  Aluno,
  alunoSchema,
};
