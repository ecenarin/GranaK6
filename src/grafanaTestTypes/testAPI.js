import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 10, // Sanal kullanıcı sayısı
    duration: '30s', // Test süresi
};

export default function () {
    const res = http.get('https://test-api.com');
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response time is less than 200ms': (r) => r.timings.duration < 200,
    });

    // Loglama
    console.log(JSON.stringify({
        level: 'info',
        message: `Response time was ${res.timings.duration}ms`,
    }));

    sleep(1); // 1 saniye bekle
}

export function handleSummary(data) {
    return {
        'summary.json': JSON.stringify(data, null, 2), // JSON dosyasına yazma
    };
}
