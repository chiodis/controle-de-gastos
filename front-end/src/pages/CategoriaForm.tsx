import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categoriaService } from '../services';
import { FinalidadeCategoria } from '../types';
import type { ICategoria, FinalidadeCategoria as FinalidadeCategoriaType } from '../types';

export function CategoriaForm() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState<ICategoria>({ nome: '', descricao: '', finalidade: FinalidadeCategoria.Despesa });
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      carregarCategoria();
    }
  }, [id]);

  const carregarCategoria = async () => {
    try {
      setLoading(true);
      setError(null);
      const dados = await categoriaService.obterPorId(Number(id));
      setCategoria(dados);
    } catch (err) {
      setError('Erro ao carregar categoria');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'finalidade') {
      setCategoria({
        ...categoria,
        [name]: Number(value) as FinalidadeCategoriaType,
      });
    } else {
      setCategoria({
        ...categoria,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!categoria.nome.trim()) {
      setError('Nome é obrigatório');
      return;
    }

    try {
      if (id) {
        await categoriaService.atualizar(Number(id), categoria);
      } else {
        await categoriaService.criar(categoria);
      }
      navigate('/categorias');
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar categoria');
      console.error(err);
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Carregando...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h1>{id ? 'Editar Categoria' : 'Nova Categoria'}</h1>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px', padding: '10px', backgroundColor: '#ffe0e0', borderRadius: '4px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="nome" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Nome *
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={categoria.nome}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="descricao" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Descrição
          </label>
          <textarea
            id="descricao"
            name="descricao"
            value={categoria.descricao}
            onChange={handleChange}
            rows={4}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="finalidade" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Finalidade *
          </label>
          <select
            id="finalidade"
            name="finalidade"
            value={categoria.finalidade}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
            }}
            required
          >
            <option value={FinalidadeCategoria.Despesa}>Despesa</option>
            <option value={FinalidadeCategoria.Receita}>Receita</option>
            <option value={FinalidadeCategoria.Ambas}>Ambas</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={() => navigate('/categorias')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
