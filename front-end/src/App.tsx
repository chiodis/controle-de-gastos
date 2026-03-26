import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  PessoasList,
  PessoaForm,
  CategoriasList,
  CategoriaForm,
  TransacoesList,
  TransacaoForm,
  Dashboard,
} from './pages';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav
          style={{
            padding: '20px',
            borderBottom: '1px solid #ccc',
            marginBottom: '20px',
            backgroundColor: '#f8f9fa',
          }}
        >
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link
              to="/dashboard"
              style={{
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#007bff',
              }}
            >
              Dashboard
            </Link>
            <Link
              to="/pessoas"
              style={{
                textDecoration: 'none',
                fontSize: '16px',
                color: '#007bff',
              }}
            >
              Pessoas
            </Link>
            <Link
              to="/categorias"
              style={{
                textDecoration: 'none',
                fontSize: '16px',
                color: '#007bff',
              }}
            >
              Categorias
            </Link>
            <Link
              to="/transacoes"
              style={{
                textDecoration: 'none',
                fontSize: '16px',
                color: '#007bff',
              }}
            >
              Transações
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/pessoas" element={<PessoasList />} />
          <Route path="/pessoas/novo" element={<PessoaForm />} />
          <Route path="/pessoas/editar/:id" element={<PessoaForm />} />

          <Route path="/categorias" element={<CategoriasList />} />
          <Route path="/categorias/novo" element={<CategoriaForm />} />
          <Route path="/categorias/editar/:id" element={<CategoriaForm />} />

          <Route path="/transacoes" element={<TransacoesList />} />
          <Route path="/transacoes/nova" element={<TransacaoForm />} />
          <Route path="/transacoes/editar/:id" element={<TransacaoForm />} />

          <Route
            path="/"
            element={
              <div style={{ padding: '20px' }}>
                <h1>Bem-vindo ao Controle de Gastos!</h1>
                <p>Clique em "Dashboard" para começar a usar a aplicação.</p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
