import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { transacaoService, TransacaoServiceError } from '../services';
import { pessoaService, categoriaService } from '../services';
import type { ITransacao, IPessoa, ICategoria } from '../types';
import { TipoTransacao } from '../types';

export function TransacaoForm() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [transacao, setTransacao] = useState<ITransacao>({
    descricao: '',
    valor: 0,
    tipo: TipoTransacao.Despesa,
    data: new Date().toISOString().split('T')[0],
    pessoaId: 0,
    categoriaId: 0,
  });

  const [pessoas, setPessoas] = useState<IPessoa[]>([]);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [loading, setLoading] = useState(!!id);
  const [erro, setErro] = useState<string | null>(null);
  const [carregandoSelects, setCarregandoSelects] = useState(true);

  useEffect(() => {
    carregarSelects();
    if (id) {
      carregarTransacao();
    }
  }, [id]);

  const carregarSelects = async () => {
    try {
      setCarregandoSelects(true);
      const [pessoasData, categoriasData] = await Promise.all([
        pessoaService.obterTodas(),
        categoriaService.obterTodas(),
      ]);
      setPessoas(pessoasData);
      setCategorias(categoriasData);
    } catch (err) {
      setErro('Erro ao carregar pessoas e categorias');
      console.error(err);
    } finally {
      setCarregandoSelects(false);
    }
  };

  const carregarTransacao = async () => {
    try {
      setLoading(true);
      setErro(null);
      const dados = await transacaoService.obterPorId(Number(id));
      setTransacao(dados);
    } catch (err) {
      setErro('Erro ao carregar transação');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'valor') {
      setTransacao({
        ...transacao,
        [name]: parseFloat(value) || 0,
      });
    } else if (name === 'tipo' || name === 'pessoaId' || name === 'categoriaId') {
      setTransacao({
        ...transacao,
        [name]: Number(value),
      });
    } else {
      setTransacao({
        ...transacao,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);

    if (!transacao.descricao.trim()) {
      setErro('Descrição é obrigatória');
      return;
    }

    if (transacao.valor <= 0) {
      setErro('Valor deve ser maior que 0');
      return;
    }

    if (!transacao.pessoaId) {
      setErro('Selecione uma pessoa');
      return;
    }

    if (!transacao.categoriaId) {
      setErro('Selecione uma categoria');
      return;
    }

    try {
      if (id) {
        await transacaoService.atualizar(Number(id), transacao);
      } else {
        await transacaoService.criar(transacao);
      }
      navigate('/transacoes');
    } catch (err: any) {
      if (err instanceof TransacaoServiceError) {
        setErro(err.message);
      } else {
        setErro(err.message || 'Erro ao salvar transação');
      }
      console.error(err);
    }
  };

  if (carregandoSelects) {
    return <div style={{ padding: '20px' }}>Carregando formulário...</div>;
  }

  if (loading) {
    return <div style={{ padding: '20px' }}>Carregando transação...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h1>{id ? 'Editar Transação' : 'Nova Transação'}</h1>

      {erro && (
        <div style={{ color: 'red', marginBottom: '20px', padding: '10px', backgroundColor: '#ffe0e0', borderRadius: '4px' }}>
          {erro}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="pessoaId" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Pessoa *
          </label>
          <select
            id="pessoaId"
            name="pessoaId"
            value={transacao.pessoaId}
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
            <option value={0}>-- Selecione uma pessoa --</option>
            {pessoas.map((pessoa) => (
              <option key={pessoa.id} value={pessoa.id}>
                {pessoa.nome}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="tipo" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Tipo *
          </label>
          <select
            id="tipo"
            name="tipo"
            value={transacao.tipo}
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
            <option value={TipoTransacao.Receita}>Receita</option>
            <option value={TipoTransacao.Despesa}>Despesa</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="categoriaId" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Categoria *
          </label>
          <select
            id="categoriaId"
            name="categoriaId"
            value={transacao.categoriaId}
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
            <option value={0}>-- Selecione uma categoria --</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="descricao" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Descrição *
          </label>
          <textarea
            id="descricao"
            name="descricao"
            value={transacao.descricao}
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
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="valor" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Valor *
          </label>
          <input
            type="number"
            id="valor"
            name="valor"
            value={transacao.valor}
            onChange={handleChange}
            step="0.01"
            min="0.01"
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
            onClick={() => navigate('/transacoes')}
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
