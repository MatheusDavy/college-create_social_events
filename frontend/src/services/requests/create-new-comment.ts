import { api } from "../api"

type Props = {
    comment: string
    eventId?: string
}

export const createCommentRequest = ({ comment, eventId }: Props) => {
    return api.post(`/user/comments.php`, JSON.stringify({
        comentario: comment,
        usuario_id: localStorage.getItem('token'),
        evento_id: eventId,
    }))
}