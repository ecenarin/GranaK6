import axios from 'axios';
import Papa from 'papaparse';

const token = "111bXgIP74Qc1tLUtTD1hCUioR93vbSRf20O342w-hMc1Fm76kyI5n41Qk_p1YYGKWDEfVZVHQd6ybDbCf9KPA==";
const headers = {
    "Authorization": `Token ${token}`,
    "Content-Type": "text/plain"
};

const org = "EceX";
const bucket = "Ece Narin";
const influxDBURL = "http://localhost:8086/api/v2";

// Write data (Create)
const writeData = async () => {
    const writeURL = `${influxDBURL}/write?org=${org}&bucket=${bucket}&precision=s`;
    const data = 'testMeasurement,tag1=value1 field1="value1"';

    try {
        const response = await axios.post(writeURL, data, { headers });
        console.log('Create response status:', response.status);
    } catch (error) {
        console.error('Create error:', error.response ? error.response.data : error.message);
    }
};

// Query data (Read)
const queryData = async () => {
    const queryURL = `${influxDBURL}/query?org=${org}`;
    const query = `from(bucket: "${bucket}") |> range(start: -1h) |> filter(fn: (r) => r._measurement == "testMeasurement")`;

    try {
        const response = await axios.post(queryURL, { query: query }, { headers, responseType: 'text' });
        const csvData = response.data;
        const jsonData = Papa.parse(csvData, { header: true }).data;
        console.log('Read response:', JSON.stringify(jsonData, null, 2));
        return jsonData;
    } catch (error) {
        console.error('Read error:', error.response ? error.response.data : error.message);
    }
};

// Update data (simulating by writing again with new value)
const updateData = async () => {
    const writeURL = `${influxDBURL}/write?org=${org}&bucket=${bucket}&precision=s`;
    const data = 'testMeasurement,tag1=value1 field1="new_value"';

    try {
        const response = await axios.post(writeURL, data, { headers });
        console.log('Update response status:', response.status);
    } catch (error) {
        console.error('Update error:', error.response ? error.response.data : error.message);
    }
};

// Delete data (simulating by writing a deletion marker)
const deleteData = async () => {
    // InfluxDB does not support direct deletion through the API, so this is a workaround
    // Usually, we mark data as deleted or we can use drop measurement (dangerous, drops all data)
    console.log('Delete simulation: Marking data as deleted');
};

(async () => {
    await writeData();  // Create
    await queryData();  // Read
    await updateData(); // Update
    await queryData();  // Read updated data
    await deleteData(); // Delete simulation
})();
