import { useEffect, useState } from 'react';
import { relatorioService } from '../services';
import type { IRelatorioTotalPessoasResponse, IRelatorioTotalCategoriasResponse } from '../types';

export function Dashboard() {
  const [relatorioPessoas, setRelatorioPessoas] = useState<IRelatorioTotalPessoasResponse | null>(null);
  const [relatorioCategories, setRelatorioCategories] = useState<IRelatorioTotalCategoriasResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarRelatorios();
  }, []);

  const carregarRelatorios = async () => {
    try {
      setLoading(true);
      setError(null);
      const [pessoas, categorias] = await Promise.all([
        relatorioService.obterTotaisPorPessoa(),
        relatorioService.obterTotaisPorCategoria(),
      ]);
      setRelatorioPessoas(pessoas);
      setRelatorioCategories(categorias);
    } catch (err) {
      setError('Erro ao carregar relatórios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatarValor = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  if (loading) return <div style={{ padding: '20px' }}>Carregando relatórios...</div>;

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffe0e0', borderRadius: '4px' }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Totais e Relatórios</h1>

      {/* Totais por Pessoa */}
      <div style={{ marginBottom: '40px' }}>
        <h2>Totais por Pessoa</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Pessoa</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Total Receitas</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Total Despesas</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Saldo</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Transações</th>
            </tr>
          </thead>
          <tbody>
            {relatorioPessoas?.itens && relatorioPessoas.itens.length > 0 ? (
              relatorioPessoas.itens.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{item.nome}</td>
                <td style={{ padding: '10px', textAlign: 'right', color: 'green' }}>
                  {formatarValor(item.totalReceitas)}
                </td>
                <td style={{ padding: '10px', textAlign: 'right', color: 'red' }}>
                  {formatarValor(item.totalDespesas)}
                </td>
                <td
                  style={{
                    padding: '10px',
                    textAlign: 'right',
                    color: item.saldo >= 0 ? 'green' : 'red',
                    fontWeight: 'bold',
                  }}
                >
                  {formatarValor(item.saldo)}
                </td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{item.totalTransacoes}</td>
              </tr>
            ))
            ) : (
              <tr>
                <td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                  Nenhuma pessoa com transações
                </td>
              </tr>
            )}
            {/* Total Geral por Pessoa */}
            {relatorioPessoas?.totalGeral && (
            <tr style={{ backgroundColor: '#f9f9f9', borderTop: '2px solid #333', borderBottom: '2px solid #333', fontWeight: 'bold' }}>
              <td style={{ padding: '10px' }}>TOTAL GERAL</td>
              <td style={{ padding: '10px', textAlign: 'right', color: 'green' }}>
                {formatarValor(relatorioPessoas?.totalGeral.totalReceitas || 0)}
              </td>
              <td style={{ padding: '10px', textAlign: 'right', color: 'red' }}>
                {formatarValor(relatorioPessoas?.totalGeral.totalDespesas || 0)}
              </td>
              <td
                style={{
                  padding: '10px',
                  textAlign: 'right',
                  color: (relatorioPessoas?.totalGeral.saldo || 0) >= 0 ? 'green' : 'red',
                }}
              >
                {formatarValor(relatorioPessoas?.totalGeral.saldo || 0)}
              </td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                {relatorioPessoas?.totalGeral.totalTransacoes}
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Totais por Categoria */}
      <div>
        <h2>Totais por Categoria</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Categoria</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Total Receitas</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Total Despesas</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Saldo</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Transações</th>
            </tr>
          </thead>
          <tbody>
            {relatorioCategories?.itens && relatorioCategories.itens.length > 0 ? (
              relatorioCategories.itens.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{item.nome}</td>
                <td style={{ padding: '10px', textAlign: 'right', color: 'green' }}>
                  {formatarValor(item.totalReceitas)}
                </td>
                <td style={{ padding: '10px', textAlign: 'right', color: 'red' }}>
                  {formatarValor(item.totalDespesas)}
                </td>
                <td
                  style={{
                    padding: '10px',
                    textAlign: 'right',
                    color: item.saldo >= 0 ? 'green' : 'red',
                    fontWeight: 'bold',
                  }}
                >
                  {formatarValor(item.saldo)}
                </td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{item.totalTransacoes}</td>
              </tr>
            ))
            ) : (
              <tr>
                <td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                  Nenhuma categoria com transações
                </td>
              </tr>
            )}
            {/* Total Geral por Categoria */}
            {relatorioCategories?.totalGeral && (
            <tr style={{ backgroundColor: '#f9f9f9', borderTop: '2px solid #333', borderBottom: '2px solid #333', fontWeight: 'bold' }}>
              <td style={{ padding: '10px' }}>TOTAL GERAL</td>
              <td style={{ padding: '10px', textAlign: 'right', color: 'green' }}>
                {formatarValor(relatorioCategories?.totalGeral.totalReceitas || 0)}
              </td>
              <td style={{ padding: '10px', textAlign: 'right', color: 'red' }}>
                {formatarValor(relatorioCategories?.totalGeral.totalDespesas || 0)}
              </td>
              <td
                style={{
                  padding: '10px',
                  textAlign: 'right',
                  color: (relatorioCategories?.totalGeral.saldo || 0) >= 0 ? 'green' : 'red',
                }}
              >
                {formatarValor(relatorioCategories?.totalGeral.saldo || 0)}
              </td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                {relatorioCategories?.totalGeral.totalTransacoes}
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
