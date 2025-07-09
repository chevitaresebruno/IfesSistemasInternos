import { Box, List, ListItem, ListItemText, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React from "react";
import { StudentRead } from "../../../types/Student";
import { ID } from "../../../../../share/service/BaseEntity";
import { DeleteOutline, EditOutlined, RemoveRedEyeOutlined, Search } from "@mui/icons-material";
import FuzzySearchInput from "../../../../../share/components/FuseSearchInput";


export interface StudentListTableProps 
{
    studentsList: StudentRead[];
}


const StudentListTable: React.FC<StudentListTableProps> = ({ studentsList }) =>
    {
        const actionsColumn = (id: ID) => {
            return (
                <>
                    <RemoveRedEyeOutlined
                        color="primary"
                        onClick={()=>console.log("Id do Aluno: ", id)}
                    />
                    <EditOutlined
                        color="primary"
                    />
                    <DeleteOutline
                        color="error"
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
                    <FuzzySearchInput
                        label="Nome do Aluno"
                        list={[]}
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
                        { studentsList.map(s => studentToRow(s)) }
                    </TableBody>
                </Table>
            </>
        )
}


export default StudentListTable;

