import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoriaService } from '../services';
import { FinalidadeCategoria } from '../types';
import type { ICategoria } from '../types';

export function CategoriasList() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarCategorias();
  }, []);

  const carregarCategorias = async () => {
    try {
      setLoading(true);
      setError(null);
      const dados = await categoriaService.obterTodas();
      setCategorias(dados);
    } catch (err) {
      setError('Erro ao carregar categorias');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja deletar esta categoria?')) return;

    try {
      await categoriaService.deletar(id);
      setCategorias(categorias.filter(c => c.id !== id));
    } catch (err) {
      setError('Erro ao deletar categoria');
      console.error(err);
    }
  };

  const getNomeFinalidade = (finalidade: FinalidadeCategoria): string => {
    const nomes: Record<FinalidadeCategoria, string> = {
      [FinalidadeCategoria.Despesa]: 'Despesa',
      [FinalidadeCategoria.Receita]: 'Receita',
      [FinalidadeCategoria.Ambas]: 'Ambas',
    };
    return nomes[finalidade] || 'Desconhecido';
  };

  if (loading) return <div style={{ padding: '20px' }}>Carregando categorias...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Categorias</h1>

      <button
        onClick={() => navigate('/categorias/novo')}
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
        Nova Categoria
      </button>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px', padding: '10px', backgroundColor: '#ffe0e0', borderRadius: '4px' }}>
          {error}
        </div>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Nome</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Descrição</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Finalidade</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{categoria.nome}</td>
              <td style={{ padding: '10px' }}>{categoria.descricao}</td>
              <td style={{ padding: '10px' }}>{getNomeFinalidade(categoria.finalidade)}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <button
                  onClick={() => navigate(`/categorias/editar/${categoria.id}`)}
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
                  onClick={() => handleDelete(categoria.id!)}
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

      {categorias.length === 0 && !loading && (
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
          Nenhuma categoria encontrada.
        </div>
      )}
    </div>
  );
}
