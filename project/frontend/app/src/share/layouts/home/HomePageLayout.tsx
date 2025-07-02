// src/share/layouts/home/HomePage.tsx
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <img
          src= "/ifes-horizontal-cor.png"
          alt="Logo do IFES"
          style={{ maxWidth: '50%', height: 'auto', marginBottom: 32 }}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          Sistemas Internos
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Bem-vindo ao sistema de gestão de estudantes.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 4 }}
          onClick={() => navigate('/login')}
        >
          Acessar Sistema
        </Button>
      </Box>
    </Container>
  );
}
