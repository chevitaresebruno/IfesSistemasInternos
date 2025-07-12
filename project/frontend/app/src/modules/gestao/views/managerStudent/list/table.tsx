import { Box, List, ListItem, ListItemText, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Student, StudentRead } from "../../../types/Student";
import { ID } from "../../../../../share/service/BaseEntity";
import { DeleteOutline, EditOutlined, RemoveRedEyeOutlined } from "@mui/icons-material";
import Fuse from "fuse.js";
import { findEntity } from "../../../../../share/utils/EntityHandler";


export interface StudentListTableProps 
{
    studentsList: StudentRead[];
    viewStudent?: ((s: StudentRead | undefined)=>void) | null;
    editStudent?: ((s: StudentRead | undefined)=>void) | null;
    deleteStudent?: ((s: StudentRead | undefined)=>void) | null;
}


const StudentListTable: React.FC<StudentListTableProps> = ({ studentsList, viewStudent, editStudent, deleteStudent }) =>
    {
        const [filteredStudents, setFilteredStudent] = useState(studentsList);

        const fuse = useMemo(()=>{ return new Fuse(studentsList.map(s => s.name), {threshold: 0.2}) }, []);
    
        useEffect(()=>{
            setFilteredStudent(studentsList);
            fuse.setCollection(studentsList.map(s=>s.name));
        }, [studentsList]);
    
        const filterStudents = (searchName: string) =>
        {
            if(searchName.length == 0)
            {
                setFilteredStudent(studentsList); 
                return;
            }

            const filteredNames = fuse.search(searchName).map(f => f.item);

            setFilteredStudent(studentsList.filter(s => filteredNames.includes(s.name)));
        }

        const actionsColumn = (id: ID) => {
            return (
                <>
                    <RemoveRedEyeOutlined
                        color="primary"
                        onClick={()=>{ if(viewStudent){viewStudent(findEntity(filteredStudents, id))} }}
                        sx={{ cursor: "pointer" }}
                    />
                    <EditOutlined
                        color="primary"
                        onClick={()=>{ if(editStudent){editStudent(findEntity(filteredStudents, id))} }}
                        sx={{ cursor: "pointer" }}
                    />
                    <DeleteOutline
                        color="error"
                        onClick={()=>{ if(deleteStudent){deleteStudent(findEntity(filteredStudents, id))} }}
                        sx={{ cursor: "pointer" }}
                    />
                </>
            )
        }

        const arrayToCell = (array: string[]) => {
            if(array.length == 0)
            {
                return "Não Fornecido";
            }

            return (
                <>
                    <List
                    sx={{
                        padding: 0,
                        margin: 0,
                        listStyleType: "none",
                        textAlign: "center", 
                    }}
                    >
                    {array.map((e, idx) => (
                        <ListItem
                        key={idx}
                        sx={{
                            paddingLeft: 0,
                            paddingTop: 0,
                            paddingBottom: 0,
                            justifyContent: "center",
                        }}
                        >
                        <ListItemText
                            primary={e}
                            sx={{ textAlign: "center" }}
                        />
                        </ListItem>
                    ))}
                    </List>
                </>
            )
        }

        const studentToRow = (student: StudentRead)  => {
            return (
            <TableRow key={student.id}>
                <TableCell> { student.name } </TableCell>
                <TableCell align="center"> { student.cpf } </TableCell>
                <TableCell align="center"> { student.matricula } </TableCell>
                <TableCell align="center"> { arrayToCell(student.email) } </TableCell>
                <TableCell align="center"> { arrayToCell(student.phone) } </TableCell>
                <TableCell align="center"> { actionsColumn(student.id) } </TableCell>
            </TableRow>
        );
        }

        return (
            <>
                <Box>
                    <TextField
                        label="Nome do Aluno"
                        color="primary"
                        fullWidth
                        onChange={(e) => { filterStudents(e.target.value); }}
                    />
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> <Typography sx={{ fontWeight: 'bold' }}> Nome </Typography> </TableCell>
                            <TableCell align="center"> <Typography sx={{ fontWeight: 'bold' }}> CPF </Typography> </TableCell>
                            <TableCell align="center"> <Typography sx={{ fontWeight: 'bold' }}> Matrícula </Typography> </TableCell>
                            <TableCell align="center"> <Typography sx={{ fontWeight: 'bold' }}> Email </Typography> </TableCell>
                            <TableCell align="center"> <Typography sx={{ fontWeight: 'bold' }}> Telefone </Typography> </TableCell>
                            <TableCell align="center"> <Typography sx={{ fontWeight: 'bold' }}> Ações </Typography> </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        { filteredStudents.map(s => { return studentToRow(s)}) }
                    </TableBody>
                </Table>
            </>
        )
}


export default StudentListTable;

