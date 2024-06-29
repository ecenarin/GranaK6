import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    vus: 50, // 50 sanal kullanıcı
    duration: '1m', // 1 dakika boyunca
};

export default function () {
    http.get('https://test-api.com');
    sleep(1);
}
