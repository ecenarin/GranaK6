import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 10 },  // below normal load
        { duration: '1m', target: 100 },  // spike to 100 users
        { duration: '10s', target: 10 },  // scale down, recovery stage
        { duration: '2m', target: 0 },    // scale down to 0 users
    ],
    thresholds: {
        'http_req_duration': ['p(99)<1500'], // 99% of requests should be below 1.5s
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
