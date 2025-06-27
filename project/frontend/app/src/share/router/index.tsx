import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

import DefaultLayout from '../layouts/DefaultLayout';
import AuthGuard from './AuthGuard';
import { GestaoRoutes } from '../../modules/gestao/router/routes';

const HomePage = lazy(() => import('../layouts/home/HomePageLayout'));
const LoginPage = lazy(() => import('../layouts/login/LoginLayout'));
const NotFoundPage = lazy(() => import('../layouts/error/404/PageNotFound'));
const NotAuthorized = lazy(() => import('../layouts/error/403/NotAuthorized'));


const Loading: React.FC = () => { return (<div>Carregando...</div>) };


const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      }
    ],
  },
  {
    // element: <AuthGuard />,
    children: [
      {
        path: "/gestao",
        element: <DefaultLayout />, // Layout base opicional
        children: GestaoRoutes,
      }
    ]
  },
  {
    path: '/acesso-negado',
    element: <NotAuthorized />
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

// Componente que fornecerá as rotas para a aplicação
export const AppRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

