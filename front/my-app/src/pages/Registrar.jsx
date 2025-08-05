import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Registrar() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validação básica no frontend
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    if (senha.length < 8) {
      setError('A senha precisa ter no mínimo 8 caracteres.');
      return;
    }

    try {
      // Chama a API de registro do seu backend
      await api.post('/login/registrar', { email, senha });

      setSuccess('Cadastro realizado com sucesso! Você será redirecionado para o login.');

      // Redireciona para a página de login após 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      // Pega a mensagem de erro da sua API (ex: "Email já registrado")
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError('Ocorreu um erro ao tentar registrar. Tente novamente.');
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Criar Conta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Senha (mínimo 8 caracteres):</label>
          <br />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Confirmar Senha:</label>
          <br />
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
        {success && <p style={{ color: 'green', marginTop: 10 }}>{success}</p>}

        <button type="submit" style={{ marginTop: 15, width: '100%', padding: '10px' }}>
          Registrar
        </button>
      </form>
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <p>
          Já tem uma conta? <Link to="/login">Faça o login</Link>
        </p>
      </div>
    </div>
  );
}

export default Registrar;