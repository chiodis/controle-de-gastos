import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { pessoaService } from '../services';
import type { IPessoa } from '../types';

export function PessoaForm() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [pessoa, setPessoa] = useState<IPessoa>({ nome: '', descricao: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      carregarPessoa();
    }
  }, [id]);

  const carregarPessoa = async () => {
    try {
      setLoading(true);
      const dados = await pessoaService.obterPorId(Number(id));
      setPessoa(dados);
    } catch (err) {
      setError('Erro ao carregar pessoa');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPessoa((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await pessoaService.atualizar(Number(id), pessoa);
      } else {
        await pessoaService.criar(pessoa);
      }
      navigate('/pessoas');
    } catch (err) {
      setError('Erro ao salvar pessoa');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h1>{id ? 'Editar Pessoa' : 'Nova Pessoa'}</h1>

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Nome: *
            <br />
            <input
              type="text"
              name="nome"
              value={pessoa.nome}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Descrição:
            <br />
            <textarea
              name="descricao"
              value={pessoa.descricao || ''}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px', minHeight: '80px' }}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: '10px 20px', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>

        <button
          type="button"
          onClick={() => navigate('/pessoas')}
          style={{ padding: '10px 20px', marginLeft: '10px', backgroundColor: '#ccc' }}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
