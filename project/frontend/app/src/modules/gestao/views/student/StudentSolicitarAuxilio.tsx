import { Search } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import StudentService, { auxilioEmpty } from "../../service/StudentService";
import { useParams } from "react-router-dom";
import { Auxilio } from "../../types/Auxilio";
import api from "../../../../share/utils/AxiosConfig";

const StudentSolicitarAuxilio: React.FC = () =>
{
        const { studentId } = useParams();
        const [auxilio1, setAuxilio1] = useState(auxilioEmpty);
        const [auxilio2, setAuxilio2] = useState(auxilioEmpty);
        const [auxilio3, setAuxilio3] = useState(auxilioEmpty);
        const [anoReferencia, setAnoReferencia] = useState(new Date().getFullYear());
        const [semestreReferencia, setSemestreReferencia] = useState<1 | 2>(1);
        const studentService = useMemo(()=>{ return new StudentService(); }, []);
        const auxilioPossibleStatus = [
            {value: "AGUARDANDO ANÁLISE", display: "Aguardando Análise"},
            {value: "APROVADO", display: "Aprovado"},
            {value: "REPROVADO", display: "Reprovado"},
        ];
        const auxilioPossibleTypes = [
            {value: "ALIMENTAÇÃO", display: "Alimentação"},
            {value: "UNIFORME", display: "Uniforme"},
            {value: "MORADIA", display: "Moradia"},
        ]

        const setAuxilioKey = (auxilioSet: React.Dispatch<React.SetStateAction<Auxilio>>, key: keyof Auxilio, value: any) =>
        {
            auxilioSet(prev => ({...prev, [key]: value}));
        }

        const solicitarAuxilio = async() =>
        {
            api.post("/auxilio/solicitar/", {
                    "student_id": studentId,
                    "ano": anoReferencia,
                    "semestre": semestreReferencia,
                    "tipo1": auxilio1.type,
                    "tipo2": auxilio2.type,
                    "tipo3": auxilio3.type
            });
        }

    return (
        <>
        <Card>
                <CardContent>
    
                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                        <Typography variant="h1">Solicitar e Consultar Auxílios</Typography>

                        <Box display={'flex'} flexDirection={'column'} gap={3}>
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
                                    .then(aux => {if(aux){ setAuxilio1(aux.auxilio1??auxilioEmpty); setAuxilio2(aux.auxilio2??auxilioEmpty); setAuxilio3(aux.auxilio3??auxilioEmpty); }})}
                            >
                                Buscar
                            </Button>
                        </Box>
                        
                        <Divider />

                        <Box display={'flex'} flexDirection={'row'} gap={2}>
                            <FormControl>
                            <InputLabel>Tipo do Primeiro Auxílio</InputLabel>
                            <Select 
                                label="Tipo do Primeiro Auxílio"
                                value={auxilio1.type} 
                                onChange={e=>setAuxilioKey(setAuxilio1, 'type', e.target.value)}
                                sx={{minWidth: "150px"}}
                            >
                                {
                                    auxilioPossibleTypes.map(_type => (
                                    <MenuItem key={_type.value} value={_type.value}>
                                        { _type.display }
                                    </MenuItem>
                                    ))
                                }
                            </Select>
                            </FormControl>
                            <FormControl>
                            <InputLabel>Status</InputLabel>
                            <Select 
                                label="Status"
                                name="status" 
                                value={auxilio1.status} 
                                sx={{minWidth: "150px"}}
                                disabled
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
                            <FormControl>
                            <InputLabel>Tipo do Segundo Auxílio</InputLabel>
                            <Select 
                                label="Tipo do Segundo Auxílio"
                                value={auxilio2.type} 
                                onChange={e=>setAuxilioKey(setAuxilio2, 'type', e.target.value)}
                                sx={{minWidth: "150px"}}
                            >
                                {
                                    auxilioPossibleTypes.map(_type => (
                                    <MenuItem key={_type.value} value={_type.value}>
                                        { _type.display }
                                    </MenuItem>
                                    ))
                                }
                            </Select>
                            </FormControl>
                            <FormControl>
                            <InputLabel>Status</InputLabel>
                            <Select 
                                label="Status"
                                name="status" 
                                value={auxilio2.status} 
                                sx={{minWidth: "150px"}}
                                disabled
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
                            <FormControl>
                            <InputLabel>Tipo do Terceiro Auxílio</InputLabel>
                            <Select 
                                label="Tipo do Terceiro Auxílio"
                                value={auxilio3.type} 
                                onChange={e=>setAuxilioKey(setAuxilio3, 'type', e.target.value)}
                                sx={{minWidth: "150px"}}
                            >
                                {
                                    auxilioPossibleTypes.map(_type => (
                                    <MenuItem key={_type.value} value={_type.value}>
                                        { _type.display }
                                    </MenuItem>
                                    ))
                                }
                            </Select>
                            </FormControl>

                            <FormControl>
                            <InputLabel>Status</InputLabel>
                            <Select 
                                label="Status"
                                name="status" 
                                disabled
                                value={auxilio3.status} 
                                sx={{minWidth: "150px"}}
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

                        <Box>
                            <Button onClick={()=>{solicitarAuxilio()}}> Solicitar </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}


export default StudentSolicitarAuxilio;

