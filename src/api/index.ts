import axios from "axios";

const baseURL = 'http://localhost:8080';

const walletApi = axios.create({ baseURL });


export default walletApi;