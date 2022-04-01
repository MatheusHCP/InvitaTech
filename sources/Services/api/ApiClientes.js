import axios from "axios";

const api = axios.create({
    baseURL: 'http://matheuspereira-001-site1.dtempurl.com',
});

export default api