import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { transacaoService } from '../services';
import { TipoTransacao } from '../types';
import type { ITransacao } from '../types';

export function TransacoesList() {
  const navigate = useNavigate();
  const [transacoes, setTransacoes] = useState<ITransacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarTransacoes();
  }, []);

  const carregarTransacoes = async () => {
    try {
      setLoading(true);
      setError(null);
      const dados = await transacaoService.obterTodas();
      setTransacoes(dados);
    } catch (err) {
      setError('Erro ao carregar transações');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja deletar esta transação?')) return;

    try {
      await transacaoService.deletar(id);
      setTransacoes(transacoes.filter(t => t.id !== id));
    } catch (err) {
      setError('Erro ao deletar transação');
      console.error(err);
    }
  };

  const getTipoLabel = (tipo: TipoTransacao): string => {
    return tipo === TipoTransacao.Receita ? 'Receita' : 'Despesa';
  };

  const formatarValor = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  if (loading) return <div style={{ padding: '20px' }}>Carregando transações...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Transações</h1>

      <button
        onClick={() => navigate('/transacoes/nova')}
        style={{
          padding: '8px 16px',
          marginBottom: '20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Nova Transação
      </button>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px', padding: '10px', backgroundColor: '#ffe0e0', borderRadius: '4px' }}>
          {error}
        </div>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Pessoa</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Categoria</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Descrição</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Tipo</th>
            <th style={{ padding: '10px', textAlign: 'right' }}>Valor</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map((transacao) => (
            <tr key={transacao.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{transacao.pessoa?.nome || '-'}</td>
              <td style={{ padding: '10px' }}>{transacao.categoria?.nome || '-'}</td>
              <td style={{ padding: '10px' }}>{transacao.descricao}</td>
              <td
                style={{
                  padding: '10px',
                  textAlign: 'center',
                  color: transacao.tipo === TipoTransacao.Receita ? 'green' : 'red',
                  fontWeight: 'bold',
                }}
              >
                {getTipoLabel(transacao.tipo)}
              </td>
              <td style={{ padding: '10px', textAlign: 'right' }}>{formatarValor(transacao.valor)}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <button
                  onClick={() => navigate(`/transacoes/editar/${transacao.id}`)}
                  style={{
                    padding: '5px 10px',
                    marginRight: '10px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(transacao.id!)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {transacoes.length === 0 && !loading && (
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
          Nenhuma transação encontrada.
        </div>
      )}
    </div>
  );
}
