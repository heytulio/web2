import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
// 1. Reutilizando o mesmo arquivo de estilo da lista de alunos!
import styles from './AlunoList.module.css'; 

function DisciplinaList() {
  const [disciplinas, setDisciplinas] = useState([]);
  
  // Sua lógica para buscar dados está ótima.
  useEffect(() => {
    async function fetchDisciplinas() {
      try {
        const res = await api.get("/disciplinas/all");
        setDisciplinas(res.data);
      } catch (error) {
        console.error("Erro ao buscar disciplinas:", error);
        alert("Erro ao buscar disciplinas");
      }
    }
    fetchDisciplinas();
  }, []);

  // Sua lógica para deletar também.
  async function handleDelete(id) {
    if (!window.confirm("Confirma a exclusão desta disciplina?")) return;

    try {
      await api.post(`/disciplinas/delete/${id}`);
      setDisciplinas(disciplinas.filter(d => d._id !== id));
    } catch (error) {
      console.error("Erro ao deletar disciplina:", error);
      alert("Erro ao deletar disciplina");
    }
  }

  // 2. O JSX é refatorado para usar as classes de estilo reutilizadas.
  return (
    <div className="container">
      <div className={styles.header}>
        <h2 className={styles.title}>Lista de Disciplinas</h2>
        <Link to="/disciplinas/novo" className={styles.newLink}>
          Nova Disciplina
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Carga Horária</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {disciplinas.length > 0 ? (
              disciplinas.map(d => (
                <tr key={d._id}>
                  <td>{d.nome}</td>
                  <td>{d.cargaHoraria}h</td> {/* Adicionado um 'h' para clareza */}
                  <td className={styles.actionsCell}>
                    <Link to={`/disciplinas/editar/${d._id}`} className={`${styles.actionButton} ${styles.editButton}`}>
                      Editar
                    </Link>
                    <button onClick={() => handleDelete(d._id)} className={`${styles.actionButton} ${styles.deleteButton}`}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className={styles.emptyMessage}>
                  Nenhuma disciplina cadastrada ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DisciplinaList;