import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 50 },  // 2 dakika içinde 50 kullanıcıya çık
        { duration: '5m', target: 50 },  // 5 dakika boyunca 50 kullanıcı
        { duration: '2m', target: 100 }, // 2 dakika içinde 100 kullanıcıya çık
        { duration: '5m', target: 100 }, // 5 dakika boyunca 100 kullanıcı
        { duration: '2m', target: 0 },   // 2 dakika içinde sıfırlan
    ],
};

export default function () {
    const res = http.get('https://www.amazon.com/s?k=laptop');

    check(res, {
        'status is 200': (r) => r.status === 200,
        'page title is correct': (r) => r.body.includes('<title>Amazon.com : laptop</title>'),
    });

    // Her isteğin arasında 1 saniye bekle
    sleep(1);
}
