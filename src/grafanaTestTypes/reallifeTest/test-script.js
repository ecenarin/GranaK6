import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

let errorRate = new Rate('errors');
let responseTime = new Trend('response_time');

export let options = {
    stages: [
        { duration: '1m', target: 50 },
        { duration: '2m', target: 50 },
        { duration: '1m', target: 100 },
        { duration: '2m', target: 100 },
        { duration: '1m', target: 0 },
    ],
    thresholds: {
        'errors': ['rate<0.1'],
        'http_req_duration': ['p(95)<500'],
    },
    ext: {
        'output-influxdb': {
            address: 'http://localhost:8086',
            token: '8NHG0zPlUN3wrrbRexP90A8ThAN5KEa9j1qfZKpRT6jAVelnJ6mxZ6SoLmabzC_W_6VHZsAhYh6k0UkY9Nk1Cw==',
            organization: 'EceX',
            bucket: 'Ece Narin',
        },
    },
};

export default function () {
    try {
        let res = http.get('https://test-api.k6.io/public/crocodiles/1/');
        let checkRes = check(res, {
            'is status 200': (r) => r.status === 200,
            'transaction time OK': (r) => r.timings.duration < 200,
        });

        if (!checkRes) {
            errorRate.add(1);
            console.log(`Request failed with status: ${res.status}`);
        } else {
            console.log('Request succeeded');
        }

        responseTime.add(res.timings.duration);
    } catch (e) {
        console.error(`Error during test run: ${e.message}`);
    } finally {
        sleep(1);
    }
}
