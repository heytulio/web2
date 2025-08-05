import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate, useParams, Link } from "react-router-dom";
import styles from './AlunoForm.module.css'; // 1. Importa os novos estilos

function AlunoForm() {
  // Sua lógica de state e fetching de dados continua perfeita
  const [aluno, setAluno] = useState({
    nome: "",
    endereco: "",
    dataNascimento: "",
    CPF: "",
    matricula: "",
    telefone: "",
    email: "",
    curso: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api
        .get(`/alunos/${id}`)
        .then((res) => {
          const dataFormatada = new Date(res.data.dataNascimento)
            .toISOString()
            .substring(0, 10);
          setAluno({ ...res.data, dataNascimento: dataFormatada });
        })
        .catch(() => alert("Erro ao carregar aluno"));
    }
  }, [id]);

  function handleChange(e) {
    setAluno({ ...aluno, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (id) {
        await api.post(`/alunos/edit/${id}`, aluno);
        alert("Aluno atualizado com sucesso");
      } else {
        await api.post("/alunos", aluno);
        alert("Aluno criado com sucesso");
      }
      navigate("/alunos");
    } catch (error) {
      alert("Erro ao salvar aluno");
    }
  }

  // 2. O JSX foi completamente refatorado para usar as classes de estilo
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>{id ? "Editar Aluno" : "Novo Aluno"}</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Usamos um div 'formGroup' para cada campo, eliminando os <br/> */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Nome:</label>
          <input
            type="text"
            name="nome"
            value={aluno.nome}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Endereço:</label>
          <input
            type="text"
            name="endereco"
            value={aluno.endereco}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        
        {/* Repita o padrão para todos os campos... */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Data de Nascimento:</label>
          <input type="date" name="dataNascimento" value={aluno.dataNascimento} onChange={handleChange} required className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>CPF:</label>
          <input type="text" name="CPF" value={aluno.CPF} onChange={handleChange} required className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Matrícula:</label>
          <input type="text" name="matricula" value={aluno.matricula} onChange={handleChange} required disabled={!!id} className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Telefone:</label>
          <input type="tel" name="telefone" value={aluno.telefone} onChange={handleChange} required className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email:</label>
          <input type="email" name="email" value={aluno.email} onChange={handleChange} required className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Curso:</label>
          <input type="text" name="curso" value={aluno.curso} onChange={handleChange} required className={styles.input} />
        </div>

        {/* 3. Um grupo de botões para melhor alinhamento e UX */}
        <div className={styles.buttonGroup}>
          <Link to="/alunos" className={styles.cancelButton}>
            Cancelar
          </Link>
          <button type="submit" className={styles.submitButton}>
            {id ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AlunoForm;