import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const NewStudentPage = lazy(() => import('../views/managerStudent/NewStudent'));


export const ManageStudentRoutes: RouteObject[] = [
    {
        path: 'newStudent',
        element: <NewStudentPage />,
    }
]

