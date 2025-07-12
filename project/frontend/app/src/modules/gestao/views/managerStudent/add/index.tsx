import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, FormControl, InputLabel, MenuItem, Select, collapseClasses, } from '@mui/material';
import React, { useState, useEffect, useMemo } from 'react';
import { StudentNew } from '../../../types/Student';
import { CourseRead } from '../../../types/Course';
import CourseService from '../../../service/CourseService';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';
import StudentService from '../../../service/StudentService';
import dayjs from 'dayjs';


export interface AddStudentModalProps
{
   open: boolean;
   close: ()=>void;
   student?: StudentNew;
}


const AddStudentModal: React.FC<AddStudentModalProps> = ({ open, student, close }) => {
  const [form, setForm] = useState<StudentNew>(student??{
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

  const courseService = useMemo(()=>{return new CourseService()}, []);
  const studentService = useMemo(()=>{return new StudentService()}, []);
  
  // Carregar cursos quando modal abrir
  useEffect(() => {
    if(open)
    {
      courseService.list()
      .then(c => setCourses(c))
      .catch(e => console.error('Erro ao carregar cursos:', e));
    }
    if(student)
    {
      setForm(student);
    }
  }, [open, student]);

  const setFormKey = (key: keyof StudentNew, value: any) =>
  {
    setForm(prev => ({...prev, [key]: value}));
  }
  
  
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault();
    try
    {
      if(form.id)
        { await studentService.save(form); }
      else
        { await studentService.new(form); }
      close();
    }
    catch(e)
    {
      console.error(e);
    }
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Adicionar Aluno</DialogTitle>

      <form onSubmit={onSubmitForm}>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField 
            label="Nome" 
            name="name" 
            value={form.name}
            onChange={e => setFormKey("name", e.target.value)} 
            fullWidth 
            required
          />
          
          <TextField 
            label="CPF" 
            name="cpf" 
            value={form.cpf}
            onChange={e => setFormKey("cpf", e.target.value)} 
            fullWidth 
            required
          />

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <DatePicker
              label="Data de Ingresso"
              name="ingresseDate"
              value={form.id ? dayjs(form.ingresseDate) : null}
              onChange={(e)=>{setFormKey("ingresseDate", e?.toDate()??form.ingresseDate); }}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <DatePicker
              label="Data de Nascimento"
              name="bornDate"
              value={form.id ? dayjs(form.bornDate) : null}
              onChange={(e)=>{setFormKey("bornDate", e?.toDate()??form.bornDate); }}
            />
          </LocalizationProvider>
          
          <FormControl fullWidth required>
            <InputLabel>Semestre</InputLabel>
            <Select 
              label="Semestre"
              name="semester" 
              value={form.semester} 
              onChange={(e)=>{setFormKey("semester", e.target?.value??form.semester)}}
            >
                <MenuItem value={1}>
                  1 (Primeiro Semestre do Ano { form.ingresseDate.getFullYear() })
                </MenuItem>
                <MenuItem value={2}>
                  2 (Segundo Semestre do Ano { form.ingresseDate.getFullYear() })
                </MenuItem>
            </Select>
          </FormControl>
          
          <TextField 
            label="Código da Matrícula (4 caracteres finais)" 
            name="matricula" 
            value={form.matricula}
            onChange={e => setFormKey("matricula", e.target.value)} 
            fullWidth 
            required
          />
          
          <FormControl fullWidth required>
            <InputLabel>Curso</InputLabel>
            <Select 
              label="Curso"
              name="course" 
              value={form.course} 
              onChange={e => setFormKey("course", e.target.value)}
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
        <Button onClick={close}>Cancelar</Button>
        <Button variant="contained" type='submit'>Salvar</Button>
      </DialogActions>

      </form>
    </Dialog>
  );
}


export default AddStudentModal;

