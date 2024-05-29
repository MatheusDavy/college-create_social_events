import { api } from "../api"

type Props = {
    nome: string
    descricao: string
    data: string
    categoria: number
    localidade: string
}

export const createEventRequest = ({ nome, descricao, data, categoria, localidade }: Props) => {
    return api.post(`/events/create-event.php`, JSON.stringify({
        dateTime: data,
        localidade,
        nome,
        descricao,
        userId: localStorage.getItem("token"),
        categoria
    }))
}