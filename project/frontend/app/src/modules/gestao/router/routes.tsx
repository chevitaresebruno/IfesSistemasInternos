import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { ManageStudentRoutes } from './ManageStudent';

const TestViewPage = lazy(() => import('../views/TestView'));


export const GestaoRoutes: RouteObject[] = [
  {
    path: '',
    element: <TestViewPage />,
  },
  {
    path: 'ManagerStudent',
    children: ManageStudentRoutes,
  },
  {
    index: true,
    element: <Navigate to='' replace />,
  },
];

