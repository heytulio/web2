import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa nosso hook de autenticação

function Login() {
  // Estados para controlar os campos do formulário e as mensagens de erro
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  // Hooks do React Router e do nosso Contexto de Autenticação
  const navigate = useNavigate();
  const { login } = useAuth(); // Pega a função 'login' do AuthContext

  /**
   * Função chamada quando o formulário é enviado.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o recarregamento da página
    setError(''); // Limpa mensagens de erro anteriores

    try {
      // Chama a função de login do nosso contexto. Ela cuidará da chamada à API.
      await login(email, senha);

      // Se o login for bem-sucedido, navega para a página inicial das rotas protegidas
      navigate('/');
    } catch (err) {
      // Se a função 'login' do contexto lançar um erro (ex: API retornou 401),
      // nós o capturamos aqui e exibimos uma mensagem para o usuário.
      setError('Email ou senha incorretos. Tente novamente.');
      console.error('Falha no login:', err); // Log para debug no console do desenvolvedor
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20, border: '1px solid #ccc', borderRadius: '8px', marginTop: '50px' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <br />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label htmlFor="senha">Senha:</label>
          <br />
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        {/* Exibe a mensagem de erro, se houver */}
        {error && <p style={{ color: 'red', marginTop: 10, textAlign: 'center' }}>{error}</p>}

        <button type="submit" style={{ marginTop: 15, width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <p>
          Não tem uma conta?{' '}
          <Link to="/registrar" style={{ color: '#007bff' }}>
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;