import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { useState, useEffect } from 'react';
import { StudentNew } from '../../types/Student';
import { CourseRead } from '../../types/Course';
import CourseService from '../../service/CourseService';


export default function AddStudentModal({
  open, onClose, onSave
}: {
  open: boolean;
  onClose: () => void;
  onSave: (student: StudentNew) => void;
}) {
  const [form, setForm] = useState<StudentNew>({
    id: '',
    name: '',
    cpf: '',
    bornDate: new Date(),
    ingresseDate: new Date(),
    semester: 1,
    matricula: '',
    phone: [],
    email: [],
    course: '',
  });
  
  const [courses, setCourses] = useState<CourseRead[]>([]);
  
  // Carregar cursos quando modal abrir
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseService = new CourseService();
        const courseList = await courseService.list();
        setCourses(courseList);
      } catch (error) {
        console.error('Erro ao carregar cursos:', error);
      }
    };
    
    if (open) {
      fetchCourses();
    }
  }, [open]);
  
  const handleSelectChange = (e: SelectChangeEvent<string | number>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDateChange = (name: keyof StudentNew, value: string) => {
    setForm(prev => ({ ...prev, [name]: new Date(value) }));
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = () => {
    if (!form.course || !form.name || !form.cpf || !form.matricula) {
      console.warn('Campos obrigatórios não preenchidos');
      return;
    }
    
    onSave(form);
    onClose();
  };
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Adicionar Aluno</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField 
            label="Nome" 
            name="name" 
            value={form.name}
            onChange={handleChange} 
            fullWidth 
            required
          />
          
          <TextField 
            label="CPF" 
            name="cpf" 
            value={form.cpf}
            onChange={handleChange} 
            fullWidth 
            required
          />
          
          <TextField
            label="Data de Nascimento"
            name="bornDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.bornDate.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange('bornDate', e.target.value)}
            fullWidth
          />
          
          <TextField
            label="Data de Ingresso"
            name="ingresseDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.ingresseDate.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange('ingresseDate', e.target.value)}
            fullWidth
          />
          
          <TextField 
            label="Semestre" 
            name="semester" 
            type="number"
            inputProps={{ min: 1, max: 2 }}
            value={form.semester}
            onChange={handleChange} 
            fullWidth 
          />
          
          <TextField 
            label="Matrícula" 
            name="matricula" 
            value={form.matricula}
            onChange={handleChange} 
            fullWidth 
            required
          />
          
          <FormControl fullWidth required>
            <InputLabel>Curso</InputLabel>
            <Select 
              name="course" 
              value={form.course} 
              onChange={handleSelectChange}
            >
              {courses.map(course => (
                <MenuItem key={course.id} value={String(course.id)}>
                  {course.name} ({course.abr})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}