import api from './api';
import type {
  IRelatorioTotalPessoasResponse,
  IRelatorioTotalCategoriasResponse,
} from '../types';

export const relatorioService = {
  obterTotaisPorPessoa: async (): Promise<IRelatorioTotalPessoasResponse> => {
    try {
      const response = await api.get<IRelatorioTotalPessoasResponse>(
        '/api/relatorios/totais-por-pessoa'
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao obter relatório de totais por pessoa:', error);
      throw error;
    }
  },

  obterTotaisPorCategoria: async (): Promise<IRelatorioTotalCategoriasResponse> => {
    try {
      const response = await api.get<IRelatorioTotalCategoriasResponse>(
        '/api/relatorios/totais-por-categoria'
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao obter relatório de totais por categoria:', error);
      throw error;
    }
  },
};
