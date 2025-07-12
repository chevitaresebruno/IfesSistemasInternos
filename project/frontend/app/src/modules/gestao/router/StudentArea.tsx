import { RouteObject } from 'react-router-dom';
import StudentCreateAccountView from '../views/student/StudentCreateAccount';
import StudentSolicitarAuxilio from '../views/student/StudentSolicitarAuxilio';


export const StudentAreaRoutes: RouteObject[] = [
    {
        path: "createAccount",
        element: <StudentCreateAccountView />
    },
    {
        path: "acoes/:studentId",
        element: <StudentSolicitarAuxilio />
    }
]

