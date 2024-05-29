import { api } from "../../api"

export const getByMonthRequest = () => {
    return api.get(`/chart/by-month.php`)
}