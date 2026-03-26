import api from './api';
import type {
  IRelatorioTotalPessoasResponse,
  IRelatorioTotalCategoriasResponse,
} from '../types';

/**
 * Serviço para operações com Relatórios
 * Responsável por fazer requisições aos endpoints de relatórios da API
 */

export const relatorioService = {
  /**
   * Obter relatório consolidado de totais agrupados por Pessoa
   * 
   * Retorna:
   * - Lista de pessoas com: totalReceitas, totalDespesas, saldo e totalTransacoes
   * - totalGeral consolidado de todas as pessoas
   */
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

  /**
   * Obter relatório consolidado de totais agrupados por Categoria
   * 
   * Retorna:
   * - Lista de categorias com: totalReceitas, totalDespesas, saldo e totalTransacoes
   * - totalGeral consolidado de todas as categorias
   */
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
