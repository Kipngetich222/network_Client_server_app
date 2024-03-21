const http = require('http');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getValidRadius() {
    rl.question('Enter the radius of the circle: ', (radius) => {
        if (!isNaN(radius) && parseFloat(radius) >= 0) {
            sendRequest(parseFloat(radius));
        } else {
            console.log('Invalid input. Please enter a non-negative number.');
            getValidRadius();
        }
    });
}

function sendRequest(radius) {
    const options = {
        host: 'localhost',
        port: 3000,
        path: `/calculate?radius=${radius}`
    };

    const request = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log(data);
            rl.close();
        });
    });

    request.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
        rl.close();
    });

    request.end();
}

getValidRadius();
