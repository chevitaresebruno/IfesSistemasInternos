import { Route, Routes } from 'react-router-dom';

import AlunoForm from '../views/crud/aluno/AlunoForm';
import AlunoList from '../views/crud/aluno/AlunoList';
import AlunoRead from '../views/crud/aluno/AlunoRead';


const AlunoRoutes = () => (
  <Routes>
    <Route path="form/:id?" element={<AlunoForm/>} />
    <Route path="/list" element={<AlunoList/>} />
    <Route path="read/:id?" element={<AlunoRead/>} />
  </Routes>
);

export default AlunoRoutes;
