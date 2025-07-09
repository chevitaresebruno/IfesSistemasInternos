import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import StudentService from '../../../service/StudentService';
import { StudentRead, StudentNew } from '../../../types/Student';
import AddStudentModal from '../AddStudentModal';
import StudentListTable from './table';


const StudentListView: React.FC = () =>
{
  const [students, setStudents] = useState<StudentRead[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const studentService = new StudentService();


  useEffect(()=>{
    studentService.list().then(setStudents);
  }, []) // Gambiarra para só executar uma vez :D


  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Gestão de Alunos</Typography>

      <Button variant="contained" onClick={() => setOpenModal(true)} sx={{ mb: 2 }}>
        Adicionar Aluno
      </Button>

      <AddStudentModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={()=>{}}
      />

      <StudentListTable
        studentsList={students}
      />

      <Paper sx={{ p: 2 }}>
        {students?.map((student) => (
          <Box
            key={student.id}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}
          >
            <Typography>
              {student.name} — Matrícula: {student.matricula}
            </Typography>
            <IconButton onClick={() => {}}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}


export default StudentListView;

