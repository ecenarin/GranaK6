import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1, // 1 sanal kullanıcı
    iterations: 1, // 1 kez çalıştır
    insecureSkipTLSVerify: true, // TLS sertifikası doğrulamasını atla
};

export default function () {
    // Form sayfasını getirme
    const res = http.get('https://juice-shop.herokuapp.com/#/search?q=test');

    // Yanıt gövdesini yazdır
    console.log('Response body (GET):', res.body);

    check(res, {
        'form page status is 200': (r) => r.status === 200,
        'response body is not empty': (r) => r.body && r.body.length > 0,
    });

    if (res.body && res.body.includes('search')) {
        console.log('Search term found in response body');
    }

    // Form gönderme işlemi (örnek)
    const payload = JSON.stringify({ comment: 'test', rating: 1 });
    const params = { headers: { 'Content-Type': 'application/json' } };
    const postRes = http.post('https://juice-shop.herokuapp.com/api/Feedbacks/', payload, params);

    // Yanıt gövdesini yazdır
    console.log('Response body (POST):', postRes.body);

    check(postRes, {
        'form submit status is 200': (r) => r.status === 200,
        'response body contains success': (r) => r.body && r.body.includes('success'),
    });

    sleep(1);
}
