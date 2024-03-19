const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;

    if (queryObject.radius) {
        const radius = parseFloat(queryObject.radius);
        if (!isNaN(radius)) {
            const area = Math.PI * radius * radius;
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`The area of the circle is: ${area}`);
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid radius');
        }
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Please provide a radius in the client terminal');
    }
});

const port = 3000;
const host = 'localhost';
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
