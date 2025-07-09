import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { ManageStudentRoutes } from './ManageStudent';

const TestViewPage = lazy(() => import('../views/TestView'));
const DashboardPage = lazy(() => import('../views/managerStudent/Dashboard'));

export const GestaoRoutes: RouteObject[] = [
  {
    path: '',
    element: <TestViewPage />,
  },
  {
    path: 'GerenciarEstudantes',
    children: ManageStudentRoutes,
  },
  {
    index: true,
    element: <Navigate to='' replace />,
  },
  {
    path: 'Dashboard',
    element: <DashboardPage />,
  },
];

