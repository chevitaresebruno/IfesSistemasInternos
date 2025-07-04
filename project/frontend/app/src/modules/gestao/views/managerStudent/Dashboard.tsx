import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import StudentService from '../../service/StudentService';
import { StudentRead, StudentNew } from '../../types/Student';
import AddStudentModal from './AddStudentModal';

const studentService = new StudentService();

export default function Dashboard() {
  const [students, setStudents] = useState<StudentRead[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const loadStudents = async () => {
    const data = await studentService.list();
    console.log("📦 Dados recebidos do backend:", data);
    // Ensure each student has the required properties for StudentRead
    const studentsRead: StudentRead[] = (data ?? []).map((student: any) => ({
      id: student.id,
      name: student.name,
      matrCode: student.matrCode,
      phone: student.phone ?? '',
      email: student.email ?? '',
      cpf: student.cpf ?? '',
      bornDate: student.bornDate ?? '',
      ingresseDate: student.ingresseDate ?? '',
      semester: student.semester ?? '',
    }));
    setStudents(studentsRead);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleAdd = async (student: StudentNew) => {
    await studentService.new(student);
    await loadStudents();
  };

  const handleDelete = async (id: number) => {
    await studentService.delete({ id } as any);
    await loadStudents();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Gestão de Alunos</Typography>

      <Button variant="contained" onClick={() => setOpenModal(true)} sx={{ mb: 2 }}>
        Adicionar Aluno
      </Button>

      <AddStudentModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleAdd}
      />

      <Paper sx={{ p: 2 }}>
        {students?.map((student) => (
          <Box
            key={student.id}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}
          >
            <Typography>
              {student.name} — Matrícula: {student.matrCode}
            </Typography>
            <IconButton onClick={() => handleDelete(Number(student.id))}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
