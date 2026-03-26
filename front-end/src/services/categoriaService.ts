import type { ICategoria } from '../types';
import api from './api';

export const categoriaService = {
  obterTodas: async (): Promise<ICategoria[]> => {
    try {
      const response = await api.get<ICategoria[]>('/api/categorias');
      return response.data;
    } catch (error) {
      console.error('Erro ao obter categorias:', error);
      throw error;
    }
  },

  obterPorId: async (id: number): Promise<ICategoria> => {
    try {
      const response = await api.get<ICategoria>(`/api/categorias/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter categoria com ID ${id}:`, error);
      throw error;
    }
  },

  criar: async (categoria: ICategoria): Promise<ICategoria> => {
    try {
      const response = await api.post<ICategoria>('/api/categorias', categoria);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      throw error;
    }
  },

  atualizar: async (id: number, categoria: ICategoria): Promise<ICategoria> => {
    try {
      const response = await api.put<ICategoria>(`/api/categorias/${id}`, categoria);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar categoria com ID ${id}:`, error);
      throw error;
    }
  },

  deletar: async (id: number): Promise<void> => {
    try {
      await api.delete(`/api/categorias/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar categoria com ID ${id}:`, error);
      throw error;
    }
  },
};
