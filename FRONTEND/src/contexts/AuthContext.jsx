import { createContext, useState, useContext } from 'react';
import { login as loginService, loginGoogle as loginGoogleService } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    const entrar = async (email, senha) => {
        setCarregando(true);
        setErro('');
        try {
            const dados = await loginService(email, senha);
            localStorage.setItem('token', dados.token); // Guarda o token para o axios usar
            setUsuario(dados.usuario);
            return true;
        } catch (e) {
            setErro('E-mail ou senha inválidos');
            return false;
        } finally {
            setCarregando(false);
        }
    };

    const entrarComGoogle = async (credential) => {
        setCarregando(true);
        setErro('');
        try {
            const dados = await loginGoogleService(credential);
            localStorage.setItem('token', dados.token);
            setUsuario(dados.usuario);
            return true;
        } catch (e) {
            setErro('Não foi possível entrar com o Google');
            return false;
        } finally {
            setCarregando(false);
        }
    };

    const sair = () => {
        localStorage.removeItem('token');
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, entrar, entrarComGoogle, sair, carregando, erro }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);