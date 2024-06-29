import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 100 }, // 2 dakika içinde 100 kullanıcıya çık
        { duration: '5m', target: 100 }, // 5 dakika boyunca 100 kullanıcı
        { duration: '2m', target: 0 }, // 2 dakika içinde sıfırlan
    ],
};

export default function () {
    http.get('https://test-api.com');
    sleep(1);
}
