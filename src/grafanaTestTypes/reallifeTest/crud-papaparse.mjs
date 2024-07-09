import axios from 'axios';
import Papa from 'papaparse';

const token = "111bXgIP74Qc1tLUtTD1hCUioR93vbSRf20O342w-hMc1Fm76kyI5n41Qk_p1YYGKWDEfVZVHQd6ybDbCf9KPA==";
const headers = {
    "Authorization": `Token ${token}`,
    "Content-Type": "application/json"
};

const org = "EceX";
const bucket = "Ece Narin";
const influxDBURL = "http://localhost:8086/api/v2";

// Write data
const writeData = async () => {
    const writeURL = `${influxDBURL}/write?org=${org}&bucket=${bucket}&precision=s`;
    const data = 'testMeasurement,tag1=value1 field1="value1"';

    try {
        const response = await axios.post(writeURL, data, { headers });
        console.log('Write response status:', response.status);
    } catch (error) {
        console.error('Write error:', error.response ? error.response.data : error.message);
    }
};

// Query data
const queryData = async () => {
    const queryURL = `${influxDBURL}/query?org=${org}`;
    const query = `from(bucket: "${bucket}") |> range(start: -1h) |> filter(fn: (r) => r._measurement == "testMeasurement")`;

    try {
        const response = await axios.post(queryURL, { query: query }, { headers, responseType: 'text' });
        const csvData = response.data;
        const jsonData = Papa.parse(csvData, { header: true }).data;
        console.log('Query response:', JSON.stringify(jsonData, null, 2));
    } catch (error) {
        console.error('Query error:', error.response ? error.response.data : error.message);
    }
};

(async () => {
    await writeData();
    await queryData();
})();
