import axios, { AxiosInstance } from 'axios';
// Suponha que temos uma função para fazer o refresh

interface RefreshResponse {
  accessToken: string;
}

/**
 * Função para solicitar um novo accessToken usando um refreshToken.
 * @returns O novo accessToken.
 * @throws Lança um erro se a requisição falhar ou se não houver refreshToken.
 */
export const refreshToken = async (): Promise<string> => {
  // 1. Obter o refreshToken do armazenamento.
  const storedRefreshToken = localStorage.getItem('refreshToken');

  if (!storedRefreshToken) {
    console.error('Refresh token não encontrado.');
    throw new Error('Sessão inválida. Por favor, faça login novamente.');
  }

  try {
    // 2. Fazer a chamada para o endpoint de refresh do backend.
    // O endpoint espera receber o refreshToken no corpo da requisição.
    const response = await axios.post<RefreshResponse>(
      `${process.env.REACT_APP_API_URL}/api/token/refresh/`, // Seu endpoint de refresh
      {
        refreshToken: storedRefreshToken,
      }
    );

    const { accessToken } = response.data;

    if (!accessToken) {
      throw new Error('Novo access token não foi retornado pelo servidor.');
    }
    
    // 3. Atualizar o accessToken no localStorage com o novo.
    localStorage.setItem('accessToken', accessToken);

    // 4. Retornar o novo accessToken para o interceptor poder usá-lo.
    return accessToken;

  } catch (error) {
    console.error('Falha ao atualizar o token:', error);
    
    // Se o refresh falhar (ex: refreshToken expirado ou revogado),
    // é hora de deslogar o usuário completamente.
    // O interceptor que chama esta função irá lidar com o logout.
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    throw new Error('Sua sessão expirou. Por favor, faça login novamente.');
  }
};

const api: AxiosInstance = axios.create({ 
    baseURL: process.env.REACT_APP_API_URL,
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (error: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token as string);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    // Se o erro for 401 e não for uma tentativa de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Se já está fazendo refresh, entra na fila
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axios(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshToken(); // Função que chama /api/auth/refresh
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Se o refresh falhar, desloga o usuário
        // Chame sua função de logout aqui
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;