import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 10 },  // ramp up to 10 users
        { duration: '5m', target: 10 },  // stay at 10 users for 5 minutes
        { duration: '1m', target: 0 },   // ramp down to 0 users
    ],
    thresholds: {
        'http_req_duration': ['p(95)<500'], // 95% of requests should be below 500ms
    },
};

const BASE_URL = 'https://test-api.k6.io'; // Test API'si, kendi API'nizi kullanabilirsiniz
const headers = {
    'Content-Type': 'application/json'
};

export default function () {
    let res = http.get(`${BASE_URL}/public/crocodiles/1/`, { headers });
    check(res, {
        'is status 200': (r) => r.status === 200,
    });
    sleep(1);
}
