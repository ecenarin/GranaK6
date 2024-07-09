import { group, check } from 'k6';
import http from 'k6/http';

// Tüm betikleri burada tanımlayın
const scripts = [
    '/Users/skup/Downloads/GrafanaK6/src/grafanaTestTypes/reallifeTest/test-script1.js',
    '/Users/skup/Downloads/GrafanaK6/src/grafanaTestTypes/reallifeTest/test-script2.js',
    // Diğer betikleri buraya ekleyin
];

export default function () {
    scripts.forEach((script) => {
        group(`Running ${script}`, function () {
            // Burada her betiği dinamik olarak çalıştırıyoruz
            eval(http.get(script).body);
        });
    });
}
