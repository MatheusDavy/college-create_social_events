import { api } from "../../api"

export const getByCategorySubscripionRequest = () => {
    return api.get(`/chart/by-category-subscription.php`)
}