import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 50 }, // ramp up to 50 users
        { duration: '5m', target: 50 }, // stay at 50 users for 5 minutes
        { duration: '1m', target: 0 },  // ramp down to 0 users
    ],
    thresholds: {
        'http_req_duration': ['p(95)<500'], // 95% of requests should be below 500ms
        'http_req_failed': ['rate<0.01'],    // error rate should be less than 1%
    },
};

const BASE_URL = 'http://localhost:8086';
const token = "111bXgIP74Qc1tLUtTD1hCUioR93vbSRf20O342w-hMc1Fm76kyI5n41Qk_p1YYGKWDEfVZVHQd6ybDbCf9KPA==";
const headers = {
    "Authorization": `Token ${token}`,
    "Content-Type": "application/json"
};

export default function () {
    // Create
    let createRes = http.post(`${BASE_URL}/api/v2/write?org=EceX&bucket=Ece Narin&precision=s`,
        'testMeasurement,tag1=value1 field1="value1"', { headers });
    check(createRes, {
        'Create: is status 204': (r) => r.status === 204,
    });

    // Simulate a read after creation
    sleep(1);
    let query = `from(bucket: "Ece Narin") |> range(start: -1h) |> filter(fn: (r) => r._measurement == "testMeasurement")`;
    let readRes = http.post(`${BASE_URL}/api/v2/query?org=EceX`, JSON.stringify({ query }), { headers });
    check(readRes, {
        'Read: is status 200': (r) => r.status === 200,
    });

    // Update (by writing new data)
    sleep(1);
    let updateRes = http.post(`${BASE_URL}/api/v2/write?org=EceX&bucket=Ece Narin&precision=s`,
        'testMeasurement,tag1=value1 field1="new_value"', { headers });
    check(updateRes, {
        'Update: is status 204': (r) => r.status === 204,
    });

    // Simulate a read after update
    sleep(1);
    let readUpdatedRes = http.post(`${BASE_URL}/api/v2/query?org=EceX`, JSON.stringify({ query }), { headers });
    check(readUpdatedRes, {
        'Read Updated: is status 200': (r) => r.status === 200,
    });

    // Simulate delete (there's no direct delete in InfluxDB via API)
    sleep(1);
    console.log('Delete simulation: No direct delete support in InfluxDB via API');

    sleep(1); // short sleep to prevent overwhelming the server
}
