import { api } from "../api"

type Props = {
    id?: string
}

export const getEventRequest = ({ id }: Props) => {
    return api.get(`/events/get-event.php?event=${id}&user_id=${localStorage.getItem('token')}`)
}