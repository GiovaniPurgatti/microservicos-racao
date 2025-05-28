import axios from 'axios';

// URLs das APIs
const CATALOG_API_URL = 'http://localhost:8080/api/v1';
const ORDER_API_URL = 'http://localhost:8082/api/v1';
const PAYMENT_API_URL = 'http://localhost:8083/api/v1';
const USER_API_URL = 'http://localhost:8083/api/v1';

// Instância do axios para o catálogo
export const catalogApi = axios.create({
    baseURL: CATALOG_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Instância do axios para pedidos
export const orderApi = axios.create({
    baseURL: ORDER_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Instância do axios para pagamentos
export const paymentApi = axios.create({
    baseURL: PAYMENT_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const userApi = axios.create({
    baseURL: USER_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default catalogApi; 