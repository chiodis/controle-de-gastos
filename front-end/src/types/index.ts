// Enums e Tipos para a aplicação de Controle de Gastos

export const TipoTransacao = { Receita: 1, Despesa: 2 } as const;
export type TipoTransacao = typeof TipoTransacao[keyof typeof TipoTransacao];

export const FinalidadeCategoria = { Despesa: 1, Receita: 2, Ambas: 3 } as const;
export type FinalidadeCategoria = typeof FinalidadeCategoria[keyof typeof FinalidadeCategoria];

export interface IPessoa {
  id?: number;
  nome: string;
  descricao?: string;
  dataCriacao?: string;
}

export interface ICategoria {
  id?: number;
  nome: string;
  descricao?: string;
  finalidade: FinalidadeCategoria;
  dataCriacao?: string;
}

export interface ITransacao {
  id?: number;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  data?: string;
  dataCriacao?: string;
  pessoaId: number;
  categoriaId: number;
  pessoa?: IPessoa;
  categoria?: ICategoria;
}

export interface IRelatorioTotalPessoa {
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  totalTransacoes: number;
}

export interface ITotalGeral {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  totalTransacoes: number;
}

export interface IRelatorioTotalPessoasResponse {
  itens: IRelatorioTotalPessoa[];
  totalGeral: ITotalGeral;
}

export interface IRelatorioTotalCategoria {
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  totalTransacoes: number;
}

export interface IRelatorioTotalCategoriasResponse {
  itens: IRelatorioTotalCategoria[];
  totalGeral: ITotalGeral;
}

export interface IErrorResponse {
  erro?: string;
  mensagem?: string;
  message?: string;
}
