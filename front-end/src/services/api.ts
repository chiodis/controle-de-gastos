import axios from 'axios';

/**
 * Configuração do Axios para comunicação com a API em C#
 * 
 * A API está rodando em: http://localhost:5012
 * URLs disponíveis:
 * - HTTP: http://localhost:5012
 * - HTTPS: https://localhost:7100
 */
const api = axios.create({
  baseURL: 'http://localhost:5012',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptador de requisição (opcional - para logs ou autenticação)
 */
api.interceptors.request.use(
  (config) => {
    // Você pode adicionar token JWT aqui na autenticação
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    console.log('Nova requisição:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Interceptador de resposta (para tratamento de erros)
 */
api.interceptors.response.use(
  (response) => {
    console.log('Resposta recebida:', response.status, response.config.url);
    return response;
  },
  (error) => {
    if (error.response) {
      // Servidor respondeu com status de erro
      console.error('Erro na resposta:', error.response.status, error.response.data);
    } else if (error.request) {
      // Requisição foi feita mas não houve resposta
      console.error('Erro na requisição:', error.request);
    } else {
      // Erro ao configurar a requisição
      console.error('Erro:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
