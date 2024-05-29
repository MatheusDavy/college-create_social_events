import { api } from "../api"

type Props = {
    eventId?: string
}

export const enterEventRequest = ({ eventId }: Props) => {
    return api.post(`/user/enter-events.php`, JSON.stringify({
        usuario_id: localStorage.getItem('token'),
        evento_id: eventId,
    }))
}