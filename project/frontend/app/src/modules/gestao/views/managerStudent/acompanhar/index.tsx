import { Box, Button, Card, CardActionArea, CardActions, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { StudentAcompanhar, StudentWrite } from "../../../types/Student";
import { useParams } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import StudentService, { auxilioEmpty, auxilioRelacaoEmpty, emptyStudentAcompanhar, emptyStudentWrite } from "../../../service/StudentService";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { CourseRead } from "../../../types/Course";
import CourseService from "../../../service/CourseService";
import { Search } from "@mui/icons-material";
import { Auxilio } from "../../../types/Auxilio";
import api from "../../../../../share/utils/AxiosConfig";


const AcompanharAlunoView: React.FC = () =>
{
    const { studentId } = useParams();


    const [studentForm, setStudentForm] = useState<StudentWrite>(emptyStudentWrite);
    const [courses, setCourses] = useState<CourseRead[]>([]);
    const [auxilio1, setAuxilio1] = useState(auxilioEmpty);
    const [auxilio2, setAuxilio2] = useState(auxilioEmpty);
    const [auxilio3, setAuxilio3] = useState(auxilioEmpty);
    const [auxilio, setAuxilio] = useState(auxilioRelacaoEmpty);

    const [anoReferencia, setAnoReferencia] = useState(new Date().getFullYear());
    const [semestreReferencia, setSemestreReferencia] = useState<1 | 2>(1);

    const studentService = useMemo(()=>{ return new StudentService(); }, []);
    const courseService = useMemo(()=>{return new CourseService()}, []);
    const auxilioPossibleStatus = [
        {value: "AGUARDANDO ANÁLISE", display: "Aguardando Análise"},
        {value: "APROVADO", display: "Aprovado"},
        {value: "REPROVADO", display: "Reprovado"},
    ];
    
    const setFormKey = (key: keyof StudentAcompanhar, value: any) =>
    {
        setStudentForm(prev => ({...prev, [key]: value}));
    }

    const setAuxilioKey = (auxilioSet: React.Dispatch<React.SetStateAction<Auxilio>>, key: keyof Auxilio, value: any) =>
    {
        auxilioSet(prev => ({...prev, [key]: value}));
    }


    useEffect(()=>{
        if(studentId)
        {
            studentService.getAcompanhar(studentId).then(e=>{setStudentForm(StudentService.readToWrite(e))});
            courseService.list()
            .then(c => setCourses(c))
            .catch(e => console.error('Erro ao carregar cursos:', e));
        }


    }, [])

    return (
        <Box display={'flex'} flexDirection={'column'} gap={3}>
            <Card>
            <form
                onSubmit={(e)=> { e.preventDefault(); studentService.save(studentForm).then(e=>console.log("Success")) } }
            >
                <CardContent>
                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                        <Typography variant="h1"> Acompanhar Aluno </Typography>

                        <TextField 
                        label="Nome" 
                        name="name" 
                        value={studentForm.name}
                        onChange={e => setFormKey("name", e.target.value)} 
                        fullWidth 
                        required
                        />
                        
                        <TextField 
                        label="CPF" 
                        name="cpf" 
                        value={studentForm.cpf}
                        onChange={e => setFormKey("cpf", e.target.value)} 
                        fullWidth 
                        required
                        />
            
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                        <DatePicker
                            label="Data de Ingresso"
                            name="ingresseDate"
                            value={studentForm.id ? dayjs(studentForm.ingresseDate) : null}
                            onChange={(e)=>{setFormKey("ingresseDate", e?.toDate()??studentForm.ingresseDate); }}
                        />
                        </LocalizationProvider>
            
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                        <DatePicker
                            label="Data de Nascimento"
                            name="bornDate"
                            value={studentForm.id ? dayjs(studentForm.bornDate) : null}
                            onChange={(e)=>{setFormKey("bornDate", e?.toDate()??studentForm.bornDate); }}
                        />
                        </LocalizationProvider>
                        
                        <FormControl fullWidth required>
                        <InputLabel>Semestre</InputLabel>
                        <Select 
                            label="Semestre"
                            name="semester" 
                            value={studentForm.semester} 
                            onChange={(e)=>{setFormKey("semester", e.target?.value??studentForm.semester)}}
                        >
                            <MenuItem value={1}>
                                1 (Primeiro Semestre do Ano { studentForm.ingresseDate.getFullYear() })
                            </MenuItem>
                            <MenuItem value={2}>
                                2 (Segundo Semestre do Ano { studentForm.ingresseDate.getFullYear() })
                            </MenuItem>
                        </Select>
                        </FormControl>
                        
                        <TextField 
                        label="Código da Matrícula (4 caracteres finais)" 
                        name="matricula" 
                        value={studentForm.matricula}
                        onChange={e => setFormKey("matricula", e.target.value)} 
                        fullWidth 
                        required
                        />
                        
                        <FormControl fullWidth required>
                        <InputLabel>Curso</InputLabel>
                        <Select 
                            label="Curso"
                            name="course" 
                            value={studentForm.course} 
                            onChange={e => setFormKey("course", e.target.value)}
                        >
                            {courses.map(course => (
                            <MenuItem key={course.id} value={String(course.id)}>
                                {course.name} ({course.abr})
                            </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                        
                        { studentForm.phone.map((p, i) => <TextField value={p} label={`Telefone ${i}`} />) }
                        { studentForm.email.map((e, i) => <TextField value={e} label={`Email ${i}`} />) }

                    </Box>
                </CardContent>

                <CardActions>
                    <Button type="submit" color="warning">Salvar Alterações</Button>
                </CardActions>
            </form>
            </Card>

            <Card>
                <CardContent>
                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                        <Typography variant="h1"> Auxílios Solicitados </Typography>

                        <Box display={'flex'} flexDirection={'row'} gap={3}>
                            <TextField
                                label="Ano de referência"
                                value={anoReferencia}
                                onChange={(e)=>{setAnoReferencia(Number.parseInt(e.target.value))}}
                            />

                            <FormControl fullWidth>
                            <InputLabel>Semestre</InputLabel>
                            <Select 
                                label="Semestre"
                                name="semester" 
                                value={semestreReferencia} 
                                onChange={(e)=>{setSemestreReferencia(e.target.value)}}
                            >
                                <MenuItem value={1}>
                                    1 (Primeiro Semestre do Ano { anoReferencia })
                                </MenuItem>
                                <MenuItem value={2}>
                                    2 (Segundo Semestre do Ano { anoReferencia })
                                </MenuItem>
                            </Select>
                            </FormControl>

                            <Button
                                color="info"
                                endIcon={<Search />}
                                variant="outlined"
                                onClick={()=>studentService.getAuxilioFromAluno(studentId??0, anoReferencia, semestreReferencia)
                                    .then(aux => {if(aux){ setAuxilio1(aux.auxilio1??auxilioEmpty); setAuxilio2(aux.auxilio2??auxilioEmpty); setAuxilio3(aux.auxilio3??auxilioEmpty); setAuxilio(aux); }})}
                            >
                                Buscar
                            </Button>
                        </Box>

                        <Box display={'flex'} flexDirection={'row'} gap={2}>
                            <TextField
                                label='Tipo do Primeiro Auxílio'
                                value={auxilio1?.type}
                                onChange={e=>setAuxilioKey(setAuxilio1, 'type', e.target.value)}
                            />
                            <FormControl>
                            <InputLabel>Status</InputLabel>
                            <Select 
                                label="Status"
                                name="status" 
                                value={auxilio1.status} 
                                onChange={e=>setAuxilioKey(setAuxilio1, 'status', e.target.value)}
                                sx={{minWidth: "500px"}}
                            >
                                
                                {
                                    auxilioPossibleStatus.map(status => (
                                    <MenuItem key={status.value} value={status.value}>
                                        { status.display }
                                    </MenuItem>
                                    ))
                                }
                            </Select>
                            </FormControl>
                        </Box>
                        <Box display={'flex'} flexDirection={'row'} gap={2}>
                            <TextField
                                label='Tipo do Segundo Auxílio'
                                value={auxilio2?.type}
                                onChange={e=>setAuxilioKey(setAuxilio2, 'type', e.target.value)}
                            />
                            <FormControl>
                            <InputLabel>Status</InputLabel>
                            <Select 
                                label="Status"
                                name="status" 
                                value={auxilio2.status} 
                                onChange={e=>setAuxilioKey(setAuxilio2, 'status', e.target.value)}
                                sx={{minWidth: "500px"}}
                            >
                                
                                {
                                    auxilioPossibleStatus.map(status => (
                                    <MenuItem key={status.value} value={status.value}>
                                        { status.display }
                                    </MenuItem>
                                    ))
                                }
                            </Select>
                            </FormControl>
                        </Box>
                        <Box display={'flex'} flexDirection={'row'} gap={2}>
                            <TextField
                                label='Tipo do Terceiro Auxílio'
                                value={auxilio3?.type}
                                onChange={e=>setAuxilioKey(setAuxilio3, 'type', e.target.value)}
                            />
                            <FormControl>
                            <InputLabel>Status</InputLabel>
                            <Select 
                                label="Status"
                                name="status" 
                                value={auxilio3.status} 
                                onChange={e=>setAuxilioKey(setAuxilio3, 'status', e.target.value)}
                                sx={{minWidth: "500px"}}
                            >
                                
                                {
                                    auxilioPossibleStatus.map(status => (
                                    <MenuItem key={status.value} value={status.value}>
                                        { status.display }
                                    </MenuItem>
                                    ))
                                }
                            </Select>
                            </FormControl>
                        </Box>
                    </Box>
                </CardContent>
                <CardActions>
                    <Button
                    onClick={()=>{
                        api.put(`/auxilio/${auxilio.id}/`, {
                            "auxilio1": {
                                "_type": auxilio1.type,
                                "status": auxilio1.status
                            },
                            "auxilio2": {
                                "_type": auxilio2.type,
                                "status": auxilio2.status
                            },
                            "auxilio3": {
                                "_type": auxilio3.type,
                                "status": auxilio3.status
                            },
                            "dataSolicitacao": auxilio.dataSolicitacao,
                            "student": studentId
                        });
                    }}
                    > Salvar </Button>
                </CardActions>
            </Card>
        </Box>
    )
}


export default AcompanharAlunoView;

