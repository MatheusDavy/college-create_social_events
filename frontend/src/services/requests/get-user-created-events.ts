import { api } from "../api"

type Props = {
    pagination: number
}

export const getUserEventsCreatedRequest = ({ pagination }: Props) => {
    return api.get(`/user/get-user-created-events.php?page=${pagination}&userId=${localStorage.getItem('token')}`)
}