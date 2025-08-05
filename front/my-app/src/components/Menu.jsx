// src/components/Menu.jsx
import React, { useState } from "react"; // 1. Importe o useState
import { NavLink } from "react-router-dom";
import styles from "./Menu.module.css";
import { useAuth } from "../context/AuthContext";

function Menu() {
  const { logout } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false); // 2. State para controlar o menu

  return (
    <nav className={styles.navbar}>
      {/* 3. Botão Hambúrguer (só aparece em telas pequenas via CSS) */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuAberto(!menuAberto)}
      >
        &#9776; {/* Este é o código para o ícone de hambúrguer */}
      </button>

      {/* 4. Adiciona a classe 'aberto' condicionalmente */}
      <div className={`${styles.navLinks} ${menuAberto ? styles.aberto : ""}`}>
        <NavLink to="/alunos" onClick={() => setMenuAberto(false)}>
          Alunos
        </NavLink>
        <NavLink to="/disciplinas" onClick={() => setMenuAberto(false)}>
          Disciplinas
        </NavLink>
        <NavLink to="/alocacao" onClick={() => setMenuAberto(false)}>
          Alocar Disciplinas
        </NavLink>
        <NavLink
          to="/disciplinas-do-aluno"
          onClick={() => setMenuAberto(false)}
        >
          Disciplinas do Aluno
        </NavLink>
      </div>

      <button onClick={logout} className={styles.logoutButton}>
        Sair
      </button>
    </nav>
  );
}

export default Menu;
