import { api } from "../api"

type Props = {
    id: string
    nome: string
    descricao: string
    data: string
    categoria: number
    localidade: string
}

export const updateEventRequest = ({ nome, descricao, data, categoria, localidade, id }: Props) => {
    return api.post(`/events/update-event.php`, JSON.stringify({
        id,
        dateTime: data,
        localidade,
        nome,
        descricao,
        userId: localStorage.getItem("token"),
        categoria
    }))
}