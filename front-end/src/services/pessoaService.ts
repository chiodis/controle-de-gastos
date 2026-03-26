import type { IPessoa } from '../types';
import api from './api';

export const pessoaService = {
  obterTodas: async (): Promise<IPessoa[]> => {
    try {
      const response = await api.get<IPessoa[]>('/api/pessoas');
      return response.data;
    } catch (error) {
      console.error('Erro ao obter pessoas:', error);
      throw error;
    }
  },

  obterPorId: async (id: number): Promise<IPessoa> => {
    try {
      const response = await api.get<IPessoa>(`/api/pessoas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter pessoa com ID ${id}:`, error);
      throw error;
    }
  },

  criar: async (pessoa: IPessoa): Promise<IPessoa> => {
    try {
      const response = await api.post<IPessoa>('/api/pessoas', pessoa);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar pessoa:', error);
      throw error;
    }
  },

  atualizar: async (id: number, pessoa: IPessoa): Promise<IPessoa> => {
    try {
      const response = await api.put<IPessoa>(`/api/pessoas/${id}`, pessoa);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar pessoa com ID ${id}:`, error);
      throw error;
    }
  },

  deletar: async (id: number): Promise<void> => {
    try {
      await api.delete(`/api/pessoas/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar pessoa com ID ${id}:`, error);
      throw error;
    }
  },
};
