import { Box, Button, Card, CardActions, CardContent, TextField } from "@mui/material"
import PasswordField from "../../components/PasswordField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../../utils/Login";


const LoginLayout: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e: {target: {name: string, value: any}}) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError('');

        try
        {
            await login(form);

            let studentId = localStorage.getItem("studentId"); 

            if( studentId != null && studentId != "0")
            {
                navigate(`/gestao/areaDoEstudante/acoes/${localStorage.getItem("studentId")}`);
            }
            else
            {
                navigate('/gestao/GerenciarEstudantes/listarEstudantes/');
            }
        }
        catch(err)
            { console.error(e); setError('Email ou senha inválidos'); }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh" // centraliza verticalmente na tela
            >
                <Card sx={{ width: 350, height: 250 }}>
                    <CardContent
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: 200, // opcional, para dar altura mínima
                    }}
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            alignItems="flex-start"  // alinha os campos à esquerda
                            sx={{ width: '100%', maxWidth: 280 }} // controla largura do box
                        >
                            <TextField
                            label="Usuário"
                            variant="standard"
                            color="primary"
                            name="username"
                            onChange={handleChange}
                            />
                            <PasswordField
                            onChange={handleChange}
                            />
                        </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button type="submit"> Login </Button>
                        <Button onClick={()=>navigate("/gestao/areaDoEstudante/createAccount")}> Cadastrar </Button>
                    </CardActions>
                </Card>
            </Box>
        </form>
    )
}


export default LoginLayout;

