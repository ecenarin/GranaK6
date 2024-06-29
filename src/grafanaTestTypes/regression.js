import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const res = http.get('https://test-api.com/feature');
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response body contains feature': (r) => r.body.includes('feature'),
    });
}
