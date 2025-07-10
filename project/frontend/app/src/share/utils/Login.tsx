import api from "./AxiosConfig";

export interface LoginForm
{
    username: string;
    password: string;
}


export default async function login(form: LoginForm): Promise<Error | void>
{
    // try catch aqui (?)
    const response = await api.post('/token/', form);
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
}

