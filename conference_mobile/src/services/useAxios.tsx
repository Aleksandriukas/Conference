import axios from 'axios';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { storage } from '../App';

export const useAxios = () => {
    const axiosClient = axios.create({
        baseURL: 'http://10.0.2.2:8080',
    });

    const token = useMMKVStorage('token', storage, null);

    axiosClient.interceptors.request.use(async (config) => {
        config.headers.Authorization = `Bearer ${token}`;

        return config;
    });

    return axiosClient;
};
