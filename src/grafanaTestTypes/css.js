import { check } from 'k6';
import http from 'k6/http';

export default function () {
    const res = http.get('https://your-website.com');

    // CSS kontrolü için ham HTML'yi kontrol ediyoruz
    check(res, {
        'body contains expected CSS': (r) => r.body.includes('.expected-css-class { color: red; }'),
    });
}
