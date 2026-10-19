import api from './api';

export const login = async (email, senha) => {
    const response = await api.post('/login', { email, senha });
    return response.data;
};

export const loginGoogle = async (credential) => {
    const response = await api.post('/auth/google', { credential });
    return response.data;
};