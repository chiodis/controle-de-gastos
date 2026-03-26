/**
 * Exportação centralizada de todos os serviços
 * Facilita as importações em toda a aplicação
 */

export { default as api } from './api';
export { pessoaService } from './pessoaService';
export { categoriaService } from './categoriaService';
export { transacaoService, TransacaoServiceError } from './transacaoService';
export { relatorioService } from './relatorioService';
