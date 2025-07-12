import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DefaultLayout: React.FC = () => {
  return (
    <div>
      <header style={{ padding: '1rem', background: '#f0f0f0' }}>
        
      </header>

      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>

      <footer style={{ padding: '1rem', background: '#f0f0f0', marginTop: '2rem' }}>
        <p>© 2025 Sistemas Internos - Ifes</p>
      </footer>
    </div>
  );
};

export default DefaultLayout;