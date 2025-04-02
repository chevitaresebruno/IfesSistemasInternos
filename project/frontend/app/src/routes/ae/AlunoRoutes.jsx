import { Route, Routes } from 'react-router-dom';

import AlunoForm from '../../views/ae/crud/aluno/AlunoForm';
import AlunoList from '../../views/ae/crud/aluno/AlunoList';
import AlunoRead from '../../views/ae/crud/aluno/AlunoRead';


const AlunoRoutes = () => (
  <Routes>
    <Route path="form/:id?" element={<AlunoForm/>} />
    <Route path="/list" element={<AlunoList/>} />
    <Route path="read/:id?" element={<AlunoRead/>} />
  </Routes>
);

export default AlunoRoutes;
