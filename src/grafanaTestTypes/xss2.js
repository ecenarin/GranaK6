import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const res = http.get('https://juice-shop.herokuapp.com');

    // X-Frame-Options başlığını kontrol et
    check(res, {
        'X-Frame-Options is DENY or SAMEORIGIN': (r) => r.headers['X-Frame-Options'] === 'DENY' || r.headers['X-Frame-Options'] === 'SAMEORIGIN',
    });
}

