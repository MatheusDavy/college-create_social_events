import { api } from "../api"

type Props = {
    pagination: number
}

export const getEventsRequest = ({ pagination }: Props) => {
    return api.get(`/events/get-events.php?page=${pagination}`)
}