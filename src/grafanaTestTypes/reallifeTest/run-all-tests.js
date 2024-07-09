const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Betiklerin bulunduğu dizin
const testDirectory = path.join(__dirname, 'src/grafanaTestTypes/reallifeTest');

// Test betiklerini al
fs.readdir(testDirectory, (err, files) => {
    if (err) {
        console.error(`Error reading directory: ${err.message}`);
        process.exit(1);
    }

    // Sadece .js dosyalarını al
    const testFiles = files.filter(file => file.endsWith('.js'));

    if (testFiles.length === 0) {
        console.log('No test scripts found.');
        process.exit(0);
    }

    // Her bir test betiğini çalıştır
    testFiles.forEach((testFile, index) => {
        const filePath = path.join(testDirectory, testFile);
        const command = `k6 run --config config.json ${filePath}`;

        console.log(`Running test script: ${testFile}`);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing ${testFile}: ${error.message}`);
                return;
            }
            console.log(`Output of ${testFile}:\n${stdout}`);
            if (stderr) {
                console.error(`Errors of ${testFile}:\n${stderr}`);
            }
        });
    });
});
// k6 run --out influxdb=http://localhost:8086/orgs/EceX/buckets/Ece%20Narin/Users/skup/Downloads/GrafanaK6/src/grafanaTestTypes/reallifeTest/load-testWithToken.js