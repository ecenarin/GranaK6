import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    vus: 20, // 20 sanal kullanıcı
    duration: '30m', // 30 dakika boyunca
};

export default function () {
    http.get('https://test-api.com');
    sleep(1);
}
