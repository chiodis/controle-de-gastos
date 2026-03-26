import api from './api';
import type { ITransacao, IErrorResponse } from '../types';

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
  obterTodas: async (): Promise<ITransacao[]> => {
    try {
      const response = await api.get<ITransacao[]>('/api/transacoes');
      return response.data;
    } catch (error) {
      console.error('Erro ao obter transações:', error);
      throw error;
    }
  },

  obterPorId: async (id: number): Promise<ITransacao> => {
    try {
      const response = await api.get<ITransacao>(`/api/transacoes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter transação com ID ${id}:`, error);
      throw error;
    }
  },

  criar: async (transacao: ITransacao): Promise<ITransacao> => {
    try {
      const response = await api.post<ITransacao>('/api/transacoes', transacao);
      return response.data;
    } catch (error: unknown) {
      let statusCode: number | undefined;
      let mensagemErro = 'Erro ao criar transação';
      let apiError: IErrorResponse | undefined;

      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status: number; data: unknown } };
        statusCode = axiosError.response?.status;
        apiError = axiosError.response?.data as IErrorResponse;
        mensagemErro = apiError?.erro || apiError?.mensagem || 'Erro ao criar transação';
      }

      console.error('Erro ao criar transação:', mensagemErro);

      throw new TransacaoServiceError(
        mensagemErro || 'Erro ao criar transação',
        statusCode,
        apiError
      );
    }
  },

  atualizar: async (id: number, transacao: ITransacao): Promise<ITransacao> => {
    try {
      const response = await api.put<ITransacao>(`/api/transacoes/${id}`, transacao);
      return response.data;
    } catch (error: unknown) {
      let statusCode: number | undefined;
      let mensagemErro = `Erro ao atualizar transação com ID ${id}`;
      let apiError: IErrorResponse | undefined;

      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status: number; data: unknown } };
        statusCode = axiosError.response?.status;
        apiError = axiosError.response?.data as IErrorResponse;
        mensagemErro = apiError?.erro || apiError?.mensagem || mensagemErro;
      }

      console.error(`Erro ao atualizar transação com ID ${id}:`, mensagemErro);

      throw new TransacaoServiceError(
        mensagemErro || `Erro ao atualizar transação com ID ${id}`,
        statusCode,
        apiError
      );
    }
  },

  deletar: async (id: number): Promise<void> => {
    try {
      await api.delete(`/api/transacoes/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar transação com ID ${id}:`, error);
      throw error;
    }
  },
};
