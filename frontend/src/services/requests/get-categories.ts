import { api } from "../api"

export const getCategoriesRequest = () => {
    return api.get(`/events/get-categories.php`)
}