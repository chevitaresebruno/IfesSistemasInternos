import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import StudentListView from '../views/managerStudent/list';

const NewStudentPage = lazy(() => import('../views/managerStudent/NewStudent'));


export const ManageStudentRoutes: RouteObject[] = [
    {
        path: 'newStudent',
        element: <NewStudentPage />,
    },
    {
        path: 'listarEstudantes',
        element: <StudentListView />
    }
]

