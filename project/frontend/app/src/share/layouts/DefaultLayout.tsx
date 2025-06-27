import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DefaultLayout: React.FC = () => {
  return (
    <div>
      <header style={{ padding: '1rem', background: '#f0f0f0' }}>
        <nav>
          <Link to="/" style={{ marginRight: '1rem' }}>
            Home
          </Link>
          <Link to="/dashboard" style={{ marginRight: '1rem' }}>
            Dashboard
          </Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>

      <footer style={{ padding: '1rem', background: '#f0f0f0', marginTop: '2rem' }}>
        <p>© 2024 Minha Aplicação Incrível</p>
      </footer>
    </div>
  );
};

export default DefaultLayout;