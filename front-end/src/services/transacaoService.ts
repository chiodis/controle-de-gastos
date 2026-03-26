import api from './api';
import type { ITransacao, IErrorResponse } from '../types';

/**
 * Serviço para operações com Transações
 * Responsável por fazer requisições HTTP à API
 * 
 * ⚠️ VALIDAÇÕES APLICADAS NA API:
 * 1. Menores de 18 anos só podem registrar Despesas
 * 2. A finalidade da categoria deve ser compatível com o tipo de transação
 */

export class TransacaoServiceError extends Error {
  public statusCode?: number;
  public apiError?: IErrorResponse;

  constructor(message: string, statusCode?: number, apiError?: IErrorResponse) {
    super(message);
    this.name = 'TransacaoServiceError';
    this.statusCode = statusCode;
    this.apiError = apiError;
  }
}

export const transacaoService = {
  /**
   * Obter todas as transações
   */
  obterTodas: async (): Promise<ITransacao[]> => {
    try {
      const response = await api.get<ITransacao[]>('/api/transacoes');
      return response.data;
    } catch (error) {
      console.error('Erro ao obter transações:', error);
      throw error;
    }
  },

  /**
   * Obter uma transação específica por ID
   */
  obterPorId: async (id: number): Promise<ITransacao> => {
    try {
      const response = await api.get<ITransacao>(`/api/transacoes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter transação com ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Criar uma nova transação COM VALIDAÇÕES
   * 
   * ⚠️ VALIDAÇÕES DA API:
   * 1. Regra de Menor de Idade: Se pessoa < 18 anos e tipo = Receita
   *    → Lança erro: "Menores de idade só podem registrar transações do tipo Despesa"
   * 2. Regra de Finalidade da Categoria: Tipo deve ser compatível com Finalidade
   *    → Lança erro: "A finalidade da categoria não é compatível com o tipo da transação"
   */
  criar: async (transacao: ITransacao): Promise<ITransacao> => {
    try {
      const response = await api.post<ITransacao>('/api/transacoes', transacao);
      return response.data;
    } catch (error: any) {
      const statusCode = error.response?.status;
      const apiError = error.response?.data as IErrorResponse;
      const mensagemErro = apiError?.erro || apiError?.mensagem || error.message;

      console.error('Erro ao criar transação:', mensagemErro);

      throw new TransacaoServiceError(
        mensagemErro || 'Erro ao criar transação',
        statusCode,
        apiError
      );
    }
  },

  /**
   * Atualizar uma transação COM VALIDAÇÕES
   * 
   * Aplica as mesmas validações do método criar()
   */
  atualizar: async (id: number, transacao: ITransacao): Promise<ITransacao> => {
    try {
      const response = await api.put<ITransacao>(`/api/transacoes/${id}`, transacao);
      return response.data;
    } catch (error: any) {
      const statusCode = error.response?.status;
      const apiError = error.response?.data as IErrorResponse;
      const mensagemErro = apiError?.erro || apiError?.mensagem || error.message;

      console.error(`Erro ao atualizar transação com ID ${id}:`, mensagemErro);

      throw new TransacaoServiceError(
        mensagemErro || `Erro ao atualizar transação com ID ${id}`,
        statusCode,
        apiError
      );
    }
  },

  /**
   * Deletar uma transação
   */
  deletar: async (id: number): Promise<void> => {
    try {
      await api.delete(`/api/transacoes/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar transação com ID ${id}:`, error);
      throw error;
    }
  },
};
