import { api } from "../api"

type Props = {
    email: string 
    senha: string
}

export const loginRequest = ({email, senha}: Props) => {
    return api.post('/auth/login.php', JSON.stringify({
        email,
        senha
    }))
}