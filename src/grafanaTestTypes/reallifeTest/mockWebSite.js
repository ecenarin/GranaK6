import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

let errorRate = new Rate('errors');
let responseTime = new Trend('response_time');

export let options = {
    stages: [
        { duration: '1m', target: 50 }, // 50 kullanıcıya kadar yük artır
        { duration: '2m', target: 50 },
        { duration: '1m', target: 100 }, // 100 kullanıcıya kadar yük artır
        { duration: '2m', target: 100 },
        { duration: '1m', target: 0 }, // yükü azalt
    ],
    thresholds: {
        'errors': ['rate<0.1'],
        'http_req_duration': ['p(95)<500'], // 95% istenen süre
    },
};

export default function () {
    let res = http.get('https://mockwebsite.com/api/resource');
    check(res, {
        'status is 200': (r) => r.status === 200,
        'transaction time OK': (r) => r.timings.duration < 200,
    }) || errorRate.add(1);
    responseTime.add(res.timings.duration);
    sleep(1);
}
