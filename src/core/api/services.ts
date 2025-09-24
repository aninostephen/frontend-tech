import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { API_KEY, API_BASE_URL, CANDIDATE_ID } from '../../config';

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: any;
}

const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'candidate_id': CANDIDATE_ID,
    },
    timeout: 300000,
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        console.log('Starting Request', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error: any) => {
        console.error('Request Error Interceptor:', error);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError | any) => {
        return Promise.reject(error);
    }
);

const get = <T = any>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.get<T>(path, config);
};

const post = <T = any, D = any>(path: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.post<T>(path, data, config);
};

const put = <T = any, D = any>(path: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.put<T>(path, data, config);
};

const del = <T = any>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.delete<T>(path, config);
};

export const ApiService = {
    get,
    post,
    put,
    delete: del,
};

