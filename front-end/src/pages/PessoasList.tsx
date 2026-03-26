import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pessoaService } from '../services';
import type { IPessoa } from '../types';

export function PessoasList() {
  const [pessoas, setPessoas] = useState<IPessoa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    carregarPessoas();
  }, []);

  const carregarPessoas = async () => {
    try {
      setLoading(true);
      const dados = await pessoaService.obterTodas();
      setPessoas(dados);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar pessoas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletar = async (id: number) => {
    if (confirm('Deseja deletar esta pessoa?')) {
      try {
        await pessoaService.deletar(id);
        carregarPessoas();
      } catch (err) {
        alert('Erro ao deletar pessoa');
        console.error(err);
      }
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Pessoas</h1>
      <button onClick={() => navigate('/pessoas/novo')}>
        + Nova Pessoa
      </button>

      <table style={{ marginTop: '20px', borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Nome</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Descrição</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((pessoa) => (
            <tr key={pessoa.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{pessoa.id}</td>
              <td style={{ padding: '10px' }}>{pessoa.nome}</td>
              <td style={{ padding: '10px' }}>{pessoa.descricao || '-'}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <button
                  onClick={() => navigate(`/pessoas/editar/${pessoa.id}`)}
                  style={{ marginRight: '10px' }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeletar(pessoa.id!)}
                  style={{ backgroundColor: '#ff4444', color: 'white' }}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {pessoas.length === 0 && <p>Nenhuma pessoa cadastrada</p>}
    </div>
  );
}
