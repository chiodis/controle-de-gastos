import type { ICategoria } from '../types';
import api from './api';

/**
 * Serviço para operações com Categorias
 * Responsável por fazer requisições HTTP à API
 */

export const categoriaService = {
  /**
   * Obter todas as categorias
   */
  obterTodas: async (): Promise<ICategoria[]> => {
    try {
      const response = await api.get<ICategoria[]>('/api/categorias');
      return response.data;
    } catch (error) {
      console.error('Erro ao obter categorias:', error);
      throw error;
    }
  },

  /**
   * Obter uma categoria específica por ID
   */
  obterPorId: async (id: number): Promise<ICategoria> => {
    try {
      const response = await api.get<ICategoria>(`/api/categorias/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter categoria com ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Criar uma nova categoria
   */
  criar: async (categoria: ICategoria): Promise<ICategoria> => {
    try {
      const response = await api.post<ICategoria>('/api/categorias', categoria);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      throw error;
    }
  },

  /**
   * Atualizar uma categoria existente
   */
  atualizar: async (id: number, categoria: ICategoria): Promise<ICategoria> => {
    try {
      const response = await api.put<ICategoria>(`/api/categorias/${id}`, categoria);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar categoria com ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Deletar uma categoria
   */
  deletar: async (id: number): Promise<void> => {
    try {
      await api.delete(`/api/categorias/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar categoria com ID ${id}:`, error);
      throw error;
    }
  },
};
