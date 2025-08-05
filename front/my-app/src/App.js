import React from "react";
// 1. Importe Outlet para renderizar rotas aninhadas
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Contexto e Componentes
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Menu from "./components/Menu";

// Páginas
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import AlunoList from "./pages/AlunoList";
import AlunoForm from "./pages/AlunoForm";
import DisciplinaList from "./pages/DisciplinaList";
import DisciplinaForm from "./pages/DisciplinaForm";
import AlocacaoDisciplinas from "./pages/AlocacaoDisciplinas";
import DisciplinasDoAluno from "./pages/DisciplinasDoAluno";

/**
 * Um componente de Layout para a área logada.
 * Ele renderiza o Menu e um "espaço" (`<Outlet/>`) onde as páginas
 * protegidas (AlunoList, AlunoForm, etc.) serão carregadas.
 */
function ProtectedLayout() {
  return (
    <>
      <Menu />
      <main>
        {/* O Outlet é onde o React Router vai renderizar a rota filha correspondente */}
        <Outlet />
      </main>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* --- Rotas Públicas --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />

          {/* --- Rotas Protegidas --- */}
          {/* Todas as rotas aqui dentro passarão pelo ProtectedRoute */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          >
            {/* Estas são as rotas filhas que serão renderizadas no <Outlet> */}
            {/* O "index" define a rota padrão para "/" */}
            <Route index element={<AlunoList />} />
            <Route path="alunos" element={<AlunoList />} />
            <Route path="alunos/novo" element={<AlunoForm />} />
            <Route path="alunos/editar/:id" element={<AlunoForm />} />

            <Route path="disciplinas" element={<DisciplinaList />} />
            <Route path="disciplinas/novo" element={<DisciplinaForm />} />
            <Route path="disciplinas/editar/:id" element={<DisciplinaForm />} />

            <Route path="alocacao" element={<AlocacaoDisciplinas />} />
            <Route
              path="disciplinas-do-aluno"
              element={<DisciplinasDoAluno />}
            />

            {/* Você pode adicionar uma rota "catch-all" para páginas não encontradas */}
            <Route path="*" element={<h2>Página não encontrada</h2>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
