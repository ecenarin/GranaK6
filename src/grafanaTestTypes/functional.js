import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const res = http.get('https://test-api.com/login');
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response body contains login': (r) => r.body.includes('login'),
    });
}
