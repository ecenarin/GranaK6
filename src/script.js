import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 10,
    duration: '30s',
    cloud: {
        // Project: Default project
        projectID: 3702994,
        // Test runs with the same name groups test runs together.
        name: 'Test (28/06/2024-08:05:11)'
    }
};

export default function() {
    http.get('https://test.k6.io');
    sleep(1);
}