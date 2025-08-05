import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate, useParams, Link } from "react-router-dom";
// 1. Importando e Reutilizando os estilos do formulário de Aluno!
import styles from './AlunoForm.module.css'; 

function DisciplinaForm() {
  // Sua lógica de state e fetching continua excelente.
  const [disciplina, setDisciplina] = useState({
    nome: "",
    cargaHoraria: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api
        .get(`/disciplinas/${id}`)
        .then((res) => {
          setDisciplina({
            nome: res.data.nome,
            cargaHoraria: res.data.cargaHoraria,
          });
        })
        .catch(() => alert("Erro ao carregar disciplina"));
    }
  }, [id]);

  function handleChange(e) {
    setDisciplina({ ...disciplina, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (id) {
        await api.post(`/disciplinas/edit/${id}`, {
          nome: disciplina.nome,
          cargaHoraria: Number(disciplina.cargaHoraria),
        });
        alert("Disciplina atualizada com sucesso");
      } else {
        await api.post("/disciplinas", {
          nome: disciplina.nome,
          cargaHoraria: Number(disciplina.cargaHoraria),
        });
        alert("Disciplina criada com sucesso");
      }
      navigate("/disciplinas");
    } catch (error) {
      alert("Erro ao salvar disciplina");
    }
  }

  // 2. O JSX foi refatorado para usar as mesmas classes do AlunoForm
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>{id ? "Editar Disciplina" : "Nova Disciplina"}</h2>
      <form onSubmit={handleSubmit}>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Nome:</label>
          <input
            type="text"
            name="nome"
            value={disciplina.nome}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Carga Horária:</label>
          <input
            type="number"
            name="cargaHoraria"
            value={disciplina.cargaHoraria}
            onChange={handleChange}
            required
            min="1"
            className={styles.input}
          />
        </div>

        {/* 3. Reutilizando o grupo de botões para consistência */}
        <div className={styles.buttonGroup}>
          <Link to="/disciplinas" className={styles.cancelButton}>
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

export default DisciplinaForm;