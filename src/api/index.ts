import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// const baseURL = 'http://localhost:8080';
const baseURL = 'https://1616-2800-e2-1080-206c-e4ea-1d86-efe0-8113.ngrok.io';

const walletApi = axios.create({ baseURL });


walletApi.interceptors.request.use(

    async (config: any) => {
        const token = await AsyncStorage.getItem('token');
        if( token ) {
            config.headers['Authorization'] = `Bearer ${token}`
        }

        return config;
    }

)


export default walletApi;