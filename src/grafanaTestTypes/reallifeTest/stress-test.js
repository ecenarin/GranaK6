import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 50 },  // ramp up to 50 users
        { duration: '3m', target: 100 }, // ramp up to 100 users
        { duration: '2m', target: 150 }, // ramp up to 150 users
        { duration: '3m', target: 200 }, // ramp up to 200 users
        { duration: '2m', target: 0 },   // ramp down to 0 users
    ],
    thresholds: {
        'http_req_duration': ['p(99)<1000'], // 99% of requests should be below 1s
    },
};

const BASE_URL = 'https://your-api-endpoint'; // Değiştir
const API_TOKEN = 'your_api_token'; // Değiştir
const headers = {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
};

export default function () {
    let res = http.get(`${BASE_URL}/endpoint`, { headers });
    check(res, {
        'is status 200': (r) => r.status === 200,
    });
    sleep(1);
}
