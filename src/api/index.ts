import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_API_URL || "https://staging.app.pennyworthfinancial.com/",
})
export interface IResponse<T = any> {
    success: boolean;
    error: boolean;
    message: string;
    data: T
}
