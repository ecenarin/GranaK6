import http from 'k6/http';
import { check } from 'k6';

export let options = {
    vus: 1,
    iterations: 1,
    insecureSkipTLSVerify: true, // TLS sertifikası doğrulamasını atla
};

export default function () {
    const res = http.get('https://test-api.com/feature');

    // Yanıt gövdesini yazdır
    console.log('Response body:', res.body);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response body is not empty': (r) => r.body && r.body.length > 0,
    });

    if (res.body && res.body.includes('feature')) {
        console.log('Feature found in response body');
    } else {
        console.error('Feature not found in response body');
    }
}

export function handleSummary(data) {
    console.log('Summary:', JSON.stringify(data, null, 2));
    return {
        'summary.json': JSON.stringify(data, null, 2), // JSON dosyasına yazma
    };
}
