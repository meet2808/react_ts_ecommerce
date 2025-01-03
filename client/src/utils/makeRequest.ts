import axios, { AxiosRequestConfig } from "axios";
import conf from "@/conf/conf";

type RequestOptions = {
    endpoint : string;
    data? : object;
    headers? : Record<string, string>;
    method : string;
}
export const makeRequest = async ({
    data = {},
    headers = {},
    endpoint,
    method = "POST"
} : RequestOptions) => {
    try {
        const config: AxiosRequestConfig = {
            method,
            url : `${conf.dbApi}${endpoint}`,
            headers: {
                "Content-Type": "application/json", // Default content type
                ...headers, // Merge custom headers
            },
            ...(method !== "GET"&& { data })
        };

        const response = await axios(config);
        return {
            success: true,
            data: response.data,
            message: response.data.message
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || error.message,
        };
    }
}