import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box
} from '@mui/material';
import { useState } from 'react';
import { StudentNew } from '../../../types/Student';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';

export default function AddStudentView({
  open, onClose, onSave
}: {
  open: boolean;
  onClose: () => void;
  onSave: (student: StudentNew) => void;
}) {
  const [form, setForm] = useState<StudentNew>({
    id: '', // Adicione um valor padrão apropriado para o tipo de 'id'
    name: '',
    cpf: '',
    bornDate: new Date(),
    ingresseDate: new Date(),
    semester: 1,
    matricula: '',
    phone: [],
    email: [],
    course: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Aqui você pode validar campos, se necessário
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Adicionar Aluno</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Nome" name="name" onChange={handleChange} fullWidth />
          <TextField label="CPF" name="cpf" onChange={handleChange} fullWidth />
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                <DatePicker
                  label="Escolha a data"
                />
              </LocalizationProvider>
          <TextField
            label="Nascimento"
            name="bornDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Ingresso"
            name="ingresseDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
            fullWidth
          />
          <TextField label="Semestre" name="semester" onChange={handleChange} fullWidth />
          <TextField label="Matrícula" name="matrCode" onChange={handleChange} fullWidth />
          {/* Campos para email e phone podem ser adicionados com novos modais ou selects */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
