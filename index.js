const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req);
    res.end('Hello World!');
});

server.listen(3000, '0.0.0.0', (err) => {
    console.log('listening to 3000 on 0.0.0.0');
});
