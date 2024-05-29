import { api } from "../../api"

export const getByCategoryRequest = () => {
    return api.get(`/chart/by-category.php`)
}