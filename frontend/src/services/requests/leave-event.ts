import { api } from "../api"

type Props = {
    eventId?: string
}

export const leaveEventRequest = ({ eventId }: Props) => {
    return api.post(`/user/leave-event.php`, JSON.stringify({
        usuario_id: localStorage.getItem('token'),
        evento_id: eventId,
    }))
}