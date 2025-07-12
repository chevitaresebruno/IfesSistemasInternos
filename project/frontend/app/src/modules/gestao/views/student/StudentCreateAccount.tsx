import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, FormControl, InputLabel, MenuItem, Select, collapseClasses, Card, CardContent, Typography, CardActions, } from '@mui/material';
import React, { useState, useEffect, useMemo } from 'react';
import { StudentNew } from '../../types/Student';
import { CourseRead } from '../../types/Course';
import CourseService from '../../service/CourseService';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';
import StudentService from '../../service/StudentService';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const StudentCreateAccountView: React.FC = () => {
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

    const courseService = useMemo(()=>{return new CourseService()}, []);
    const studentService = useMemo(()=>{return new StudentService()}, []);
    const navigate = useNavigate();
  
    useEffect(() => {
          courseService.list()
          .then(c => setCourses(c))
          .catch(e => console.error('Erro ao carregar cursos:', e));
      }, []);

  const setFormKey = (key: keyof StudentNew, value: any) =>
  {
    setForm(prev => ({...prev, [key]: value}));
  }
  
  
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault();
    try
    {
        await studentService.new(form);
        navigate("/login");
    }
    catch(e)
    {
      console.error(e);
    }
  };

  return (
    <Card>
        <CardContent>

            <Typography variant='h1'>Cadastrar-se no Sistema</Typography>

            <form onSubmit={onSubmitForm}>

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
                    value={dayjs(form.ingresseDate)}
                    onChange={(e)=>{setFormKey("ingresseDate", e?.toDate()??form.ingresseDate); }}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                    <DatePicker
                    label="Data de Nascimento"
                    name="bornDate"
                    value={dayjs(form.bornDate)}
                    onChange={(e)=>{setFormKey("bornDate", e?.toDate()??form.bornDate); }}
                    />
                </LocalizationProvider>
                
                <FormControl fullWidth required>
                    <InputLabel>Semestre de Ingresso</InputLabel>
                    <Select 
                    label="Semestre de Ingresso"
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

                <TextField 
                    label="Número de Telefone" 
                    onChange={e => setFormKey("phone", [{ddd: e.target.value.slice(0, 2), numero: e.target.value.slice(2), id: 0}])} 
                    fullWidth 
                    required
                />

                <TextField 
                    label="Email" 
                    onChange={e => setFormKey("email", [{mail: e.target.value}])} 
                    fullWidth 
                />

                </Box>
            <CardActions>
                <Button variant="contained" type='submit'>Salvar</Button>
            </CardActions>

            </form>
        </CardContent>
    </Card>
  );
}


export default StudentCreateAccountView;

