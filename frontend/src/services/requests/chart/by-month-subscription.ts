import { api } from "../../api"

export const getByMonthSubscriptionRequest = () => {
    return api.get(`/chart/by-month-subscription.php`)
}