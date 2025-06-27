import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode'; // <<< Importar a biblioteca

// ... (definição do ApiUser e AuthContextType)

// Adicionamos a função de logout ao nosso tipo
interface DecodedToken {
  sub: string; // "subject", geralmente o ID do usuário
  name: string;
  email: string;
  role?: string;
  iat: number; // "issued at", data de emissão
  exp: number; // "expires at", data de expiração (TIMESTAMP EM SEGUNDOS)
}

// A maneira mais simples é fazer ApiUser ser um "apelido" para os dados do token
export type ApiUser = Omit<DecodedToken, 'exp'>; // Pega tudo de DecodedToken, exceto 'exp'


// ... (dentro do AuthProvider)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loginWithToken = async (token: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // 1. Decodificar o token para uma verificação rápida de expiração (opcional, mas bom)
      const decodedToken: DecodedToken = jwtDecode(token);
      
      // O timestamp 'exp' está em segundos, Date.now() está em milissegundos
      if (decodedToken.exp * 1000 < Date.now()) {
        throw new Error('Token expirado localmente.');
      }

      // 2. Validar o token com o backend (passo essencial)
      const response = await fetch(`${process.env.REACT_APP_API_URL}/token/verify/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Token inválido no backend');
      }

      const userData: ApiUser = await response.json();

      // 3. Sucesso! Atualizar estado e armazenar o token
      setUser(userData);
      localStorage.setItem('accessToken', token);
      
      setIsLoading(false);
      return true;

    } catch (error) {
      console.error("Falha no login com token:", error);
      // Limpeza em caso de falha
      setUser(null);
      localStorage.removeItem('accessToken');
      setIsLoading(false);
      return false;
    }
  };

  // ... (o resto do provedor, incluindo o useEffect que chama loginWithToken na inicialização)
  // ... (função signOutUser)
};