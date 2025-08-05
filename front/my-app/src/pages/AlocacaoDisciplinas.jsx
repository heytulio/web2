import React, { useEffect, useState } from "react";
import api from "../services/api";
import styles from './AlocacaoDisciplinas.module.css';

function AlocacaoDisciplinas() {
  const [matricula, setMatricula] = useState("");
  const [aluno, setAluno] = useState(null);
  const [disciplinasAluno, setDisciplinasAluno] = useState([]);
  const [todasDisciplinas, setTodasDisciplinas] = useState([]);
  const [loading, setLoading] = useState(false);

  // A lógica continua a mesma, está perfeita.
  useEffect(() => {
    api.get("/disciplinas/all")
      .then(res => setTodasDisciplinas(res.data))
      .catch(() => alert("Erro ao carregar disciplinas"));
  }, []);

  async function buscarAlunoEDisciplinas() {
    if (!matricula) {
      alert("Informe a matrícula");
      return;
    }
    setLoading(true);
    try {
      const resAluno = await api.get(`/alunos/matricula/${matricula}`);
      setAluno(resAluno.data);

      const resDisc = await api.get(`/alunos/${matricula}/disciplinas`);
      setDisciplinasAluno(resDisc.data);
    } catch (error) {
      alert("Aluno não encontrado ou erro ao buscar disciplinas");
      setAluno(null);
      setDisciplinasAluno([]);
    } finally {
      setLoading(false);
    }
  }

  async function alocarDisciplina(idDisciplina) {
    if (!aluno) return;
    try {
      await api.post("/alunodisciplinas/alocar", { aluno: aluno._id, disciplina: idDisciplina });
      alert("Disciplina alocada com sucesso");
      buscarAlunoEDisciplinas(); // Re-busca os dados para atualizar as listas
    } catch {
      alert("Erro ao alocar disciplina");
    }
  }

  async function desalocarDisciplina(idDisciplina) {
    if (!aluno) return;
    try {
      await api.post("/alunodisciplinas/desalocar", { aluno: aluno._id, disciplina: idDisciplina });
      alert("Disciplina desalocada com sucesso");
      buscarAlunoEDisciplinas(); // Re-busca os dados para atualizar as listas
    } catch {
      alert("Erro ao desalocar disciplina");
    }
  }

  const disciplinasDisponiveis = todasDisciplinas.filter(
    d => !disciplinasAluno.some(ad => ad._id === d._id)
  );

  return (
    <div className="container">
      <div className={styles.pageContainer}>
        <h2 className={styles.title}>Gerenciar Disciplinas do Aluno</h2>

        <div className={styles.searchContainer}>
          <label className={styles.searchLabel}>Matrícula do Aluno:</label>
          <input
            type="text"
            value={matricula}
            onChange={e => setMatricula(e.target.value)}
            className={styles.searchInput}
            placeholder="Digite a matrícula..."
          />
          <button onClick={buscarAlunoEDisciplinas} disabled={loading} className={styles.searchButton}>
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>

        {aluno && (
          <div>
            <div className={styles.alunoInfo}>
              <h3 className={styles.alunoNome}>Aluno: {aluno.nome} ({aluno.matricula})</h3>
            </div>

            <div className={styles.listsContainer}>
              {/* Coluna da Esquerda */}
              <div className={styles.listWrapper}>
                <h4 className={styles.listTitle}>Disciplinas Alocadas</h4>
                {disciplinasAluno.length === 0 ? (
                    <p className={styles.emptyListMessage}>Nenhuma disciplina alocada.</p>
                ) : (
                  <ul className={styles.disciplineList}>
                    {disciplinasAluno.map(d => (
                      <li key={d._id} className={styles.disciplineItem}>
                        <span>{d.nome} ({d.cargaHoraria}h)</span>
                        <button onClick={() => desalocarDisciplina(d._id)} className={`${styles.actionButton} ${styles.desalocarButton}`}>
                          Desalocar
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Coluna da Direita */}
              <div className={styles.listWrapper}>
                <h4 className={styles.listTitle}>Disciplinas Disponíveis</h4>
                {disciplinasDisponiveis.length === 0 ? (
                    <p className={styles.emptyListMessage}>Sem disciplinas disponíveis para alocar.</p>
                ) : (
                  <ul className={styles.disciplineList}>
                    {disciplinasDisponiveis.map(d => (
                      <li key={d._id} className={styles.disciplineItem}>
                        <span>{d.nome} ({d.cargaHoraria}h)</span>
                        <button onClick={() => alocarDisciplina(d._id)} className={`${styles.actionButton} ${styles.alocarButton}`}>
                          Alocar
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AlocacaoDisciplinas;