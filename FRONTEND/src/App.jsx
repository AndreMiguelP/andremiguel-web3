import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, LogOut, Sun, Moon, Activity } from 'lucide-react';
import Home from './pages/Home/Home';
import Usuarios from './pages/Usuarios/Usuarios';
import Login from './pages/Login/Login';
import { useAuth } from './contexts/AuthContext';

function RotaProtegida({ children }) {
  const { usuario } = useAuth();
  if (!usuario) {
      return <Navigate to="/login" replace />;
  }
  return children;
}

function Layout() {
  const [theme, setTheme] = useState('light');
  const { usuario, sair } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const handleSair = (e) => {
    e.preventDefault();
    sair();
    navigate('/login');
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={24} color="var(--primary-color)" />
            WEB III
          </div>
        </div>
        <Link to="/" className="sidebar-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link to="/usuarios" className="sidebar-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={20} />
          Usuários
        </Link>
        <a href="/configuracoes" className="sidebar-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={20} />
          Configurações
        </a>
        <a href="/" onClick={handleSair} className="sidebar-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto', marginBottom: '1rem' }}>
          <LogOut size={20} />
          Sair
        </a>
      </aside>

      <div className="right-area">
        <nav className="top-navbar">
          <div className="navbar-right">
            <button onClick={toggleTheme} className="theme-toggle-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            
            <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'transparent', padding: '0' }}>
                {usuario?.foto ? (
                    <img 
                        src={usuario.foto} 
                        alt={usuario.nome} 
                        referrerPolicy="no-referrer"
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                ) : (
                    <span style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        {usuario?.nome?.charAt(0).toUpperCase()}
                    </span>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Olá, {usuario?.nome?.split(' ')[0]}</span>
                    {usuario?.email && <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{usuario.email}</span>}
                </div>
            </div>

          </div>
        </nav>

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usuarios" element={<Usuarios />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <RotaProtegida>
            <Layout />
          </RotaProtegida>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;