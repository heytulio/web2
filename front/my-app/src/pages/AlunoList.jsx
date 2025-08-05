import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Não precisamos mais do useNavigate aqui
import api from "../services/api";
import styles from "./AlunoList.module.css"; // 1. Importa os nossos estilos

function AlunoList() {
  const [alunos, setAlunos] = useState([]);

  // A sua lógica para buscar dados continua perfeita
  useEffect(() => {
    async function fetchAlunos() {
      try {
        const res = await api.get("/alunos/all");
        setAlunos(res.data);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
        alert("Erro ao buscar alunos");
      }
    }
    fetchAlunos();
  }, []);

  // A sua lógica para deletar também está ótima
  async function handleDelete(id) {
    if (!window.confirm("Confirma a exclusão deste aluno?")) return;

    try {
      await api.post(`/alunos/delete/${id}`);
      setAlunos(alunos.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Erro ao deletar aluno:", error);
      alert("Erro ao deletar aluno");
    }
  }

  // 2. O JSX agora está muito mais limpo, usando as classes de estilo
  return (
    <div className="container">
      {" "}
      {/* Usando a classe de layout global do index.css */}
      <div className={styles.header}>
        <h2 className={styles.title}>Lista de Alunos</h2>
        <Link to="/alunos/novo" className={styles.newLink}>
          Novo Aluno
        </Link>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Matrícula</th>
              <th>Curso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.length > 0 ? (
              alunos.map((aluno) => (
                <tr key={aluno._id}>
                  <td data-label="Nome">{aluno.nome}</td>
                  <td data-label="Matrícula">{aluno.matricula}</td>
                  <td data-label="Curso">{aluno.curso}</td>
                  <td data-label="Ações" className={styles.actionsCell}>
                    {/* 3. Para navegação, é melhor usar <Link> estilizado como botão */}
                    <Link
                      to={`/alunos/editar/${aluno._id}`}
                      className={`${styles.actionButton} ${styles.editButton}`}
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(aluno._id)}
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              // 4. Linha para quando não há alunos, com estilo apropriado
              <tr>
                <td colSpan="4" className={styles.emptyMessage}>
                  Nenhum aluno cadastrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AlunoList;
