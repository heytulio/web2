import React, { useState } from "react";
import api from "../services/api";
import styles from './DisciplinasDoAluno.module.css';

function DisciplinasDoAluno() {
  const [matricula, setMatricula] = useState("");
  const [disciplinas, setDisciplinas] = useState([]);
  const [error, setError] = useState(null);
  const [aluno, setAluno] = useState(null);
  const [loading, setLoading] = useState(false); // Adicionado para feedback no botão

  async function buscarDisciplinas() {
    setError(null);
    setAluno(null);
    setDisciplinas([]); // Limpa resultados anteriores
    setLoading(true);

    if (!matricula) {
        setError("Por favor, insira uma matrícula.");
        setLoading(false);
        return;
    }

    try {
      // Faz as duas chamadas em paralelo para mais performance
      const [resDisciplinas, resAluno] = await Promise.all([
          api.get(`/alunos/${matricula}/disciplinas`),
          api.get(`/alunos/matricula/${matricula}`)
      ]);
      
      setDisciplinas(resDisciplinas.data);
      setAluno(resAluno.data);

      if (resDisciplinas.data.length === 0) {
        setError("Aluno não está matriculado em nenhuma disciplina.");
      }
    } catch (err) {
      setDisciplinas([]);
      setError("Erro ao buscar. Verifique a matrícula e tente novamente.");
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className={styles.pageContainer}>
        <h2 className={styles.title}>Consultar Disciplinas por Aluno</h2>

        <div className={styles.searchContainer}>
          <label className={styles.searchLabel}>Matrícula:</label>
          <input
            type="text"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            className={styles.searchInput}
            placeholder="Digite a matrícula do aluno..."
          />
          <button onClick={buscarDisciplinas} className={styles.searchButton} disabled={loading}>
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>

        {/* Exibe o container de resultados apenas se não houver erro E um aluno tiver sido encontrado */}
        {aluno && !error && (
            <div className={styles.resultsContainer}>
                <div className={styles.alunoInfoBox}>
                    <h3>{aluno.nome}</h3>
                    <p><strong>Matrícula:</strong> {aluno.matricula}</p>
                    <p><strong>Curso:</strong> {aluno.curso}</p>
                </div>
                <h4>Disciplinas Matriculadas:</h4>
                <ul className={styles.disciplinasList}>
                    {disciplinas.map((disciplina) => (
                        <li key={disciplina._id}>
                        {disciplina.nome} — {disciplina.cargaHoraria} horas
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {/* Exibe a mensagem de erro, se houver */}
        {error && <p className={styles.errorMessage}>{error}</p>}
        
      </div>
    </div>
  );
}

export default DisciplinasDoAluno;