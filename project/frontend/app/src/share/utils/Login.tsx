import api from "./AxiosConfig";

export interface LoginForm
{
    username: string;
    password: string;
}


export default async function login(form: LoginForm): Promise<Error | void>
{
    const response = await api.post('api/token/', form);
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refres);
}

