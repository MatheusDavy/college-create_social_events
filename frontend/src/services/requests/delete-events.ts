import { api } from "../api"

type Props = {
    eventId?: string
}

export const deleteEventRequest = ({ eventId }: Props) => {
    return api.delete(`/events/delete-event.php?event=${eventId}`)
}