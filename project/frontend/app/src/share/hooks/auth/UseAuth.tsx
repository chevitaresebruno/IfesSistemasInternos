import { useState, useEffect } from 'react';

// Em uma aplicação real, isso viria de um Contexto ou Zustand/Redux
// que interage com o SDK do Firebase Auth, Auth0, etc.
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simula uma verificação de sessão assíncrona
    setTimeout(() => {
      // Mude para `true` para simular um usuário logado
      const userIsLoggedIn = false; 
      setIsAuthenticated(userIsLoggedIn);
      setIsLoading(false);
    }, 500);
  }, []);

  return { isAuthenticated, isLoading };
};