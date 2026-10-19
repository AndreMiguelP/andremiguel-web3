import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../contexts/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { entrar, entrarComGoogle, erro, carregando } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const deuCerto = await entrar(email, senha);
        if (deuCerto) navigate('/');
    };

    const handleGoogle = async (resposta) => {
        // resposta.credential é o id_token assinado pelo Google
        const deuCerto = await entrarComGoogle(resposta.credential);
        if (deuCerto) navigate('/');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: 'var(--bg-global)' }}>
            <form onSubmit={handleSubmit} style={{ background: 'var(--card-bg)', padding: '2.5rem', borderRadius: '12px', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', margin: '0 0 1rem 0', color: 'var(--text-primary)' }}>Entrar no Sistema</h2>
                
                {erro && <div style={{ color: '#f44336', textAlign: 'center', fontSize: '0.9rem' }}>{erro}</div>}
                
                <input 
                    type="email" 
                    placeholder="E-mail" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-global)', color: 'var(--text-primary)' }}
                />
                <input 
                    type="password" 
                    placeholder="Senha" 
                    value={senha} 
                    onChange={(e) => setSenha(e.target.value)} 
                    required 
                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-global)', color: 'var(--text-primary)' }}
                />
                
                <button className="primary-button" type="submit" disabled={carregando} style={{ padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', width: '100%', justifyContent: 'center' }}>
                    {carregando ? 'Aguarde...' : 'Entrar'}
                </button>

                <p style={{ textAlign: 'center', margin: '1rem 0', color: 'var(--text-secondary)' }}>ou</p>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <GoogleLogin
                        onSuccess={handleGoogle}
                        onError={() => console.log('Login com Google falhou')}
                    />
                </div>
            </form>
        </div>
    );
}

export default Login;