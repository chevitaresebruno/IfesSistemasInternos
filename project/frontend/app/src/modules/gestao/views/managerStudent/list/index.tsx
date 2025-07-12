import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import StudentService, { emptyStudentWrite } from '../../../service/StudentService';
import { StudentRead } from '../../../types/Student';
import StudentListTable from './table';
import AddStudentModal from '../add';
import DeleteConfirmation from '../../../../../share/components/DeleteConfirmation';
import { useNavigate } from 'react-router-dom';


const StudentListView: React.FC = () =>
{
  const [students, setStudents] = useState<StudentRead[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(emptyStudentWrite);
  const studentService = new StudentService();

  const navigate = useNavigate();


  useEffect(()=>{ studentService.list().then(setStudents); }, []) // Gambiarra para só executar uma vez :D


  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Gestão de Alunos</Typography>

      <Button
        variant="contained"
        onClick={() => {setOpenEditModal(true); setSelectedStudent(emptyStudentWrite); }}
        sx={{ mb: 2 }}
      >
        Adicionar Aluno
      </Button>

      <StudentListTable
        studentsList={students}
        viewStudent={(s)=>{if(s){ navigate(`/gestao/GerenciarEstudantes/acompanharEstudante/${s.id}`); }}}
        editStudent={(s)=>{if(s){setSelectedStudent(StudentService.readToWrite(s)); setOpenEditModal(true)}}}
        deleteStudent={(s)=>{ if(s){setSelectedStudent(StudentService.readToWrite(s)); setOpenDeleteModal(true)} }}
      />

      <AddStudentModal
        open={openEditModal}
        close={()=>setOpenEditModal(false)}
        student={selectedStudent}
      />

      <DeleteConfirmation
        open={openDeleteModal}
        label={`o(a) aluno(a) ${selectedStudent.name}`}
        content='TODAS as informações salvas do aluno serão apagadas.'
        onConfirm={async()=>{ studentService.delete(selectedStudent).then(e => setOpenDeleteModal(false)).catch(e => console.error(e)); }} 
      />
    </Box>
  );
}


export default StudentListView;

