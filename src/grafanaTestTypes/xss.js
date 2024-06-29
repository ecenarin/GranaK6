import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const url = 'https://your-website.com/search?q=<script>alert(1)</script>';
    const res = http.get(url);

    // Yanıtta zararlı script'in var olup olmadığını kontrol et
    check(res, {
        'XSS vulnerability': (r) => r.body.includes('<script>alert(1)</script>'),
    });
}
