const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/'){
        res.write(`<html>`);
        res.write(`<head>
                        <title>Hello World!</title>
                   </head>`);
        res.write(`<body>
                        <form action="/message" method="POST">
                            <input type="text">
                            <button type="submit">Send</button>
                        </form>
                   </body>`);
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        fs.writeFileSync('message.txt', 'DUMMY');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    console.log(req.url, req.method, req.headers);
    res.setHeader('Content-Type','text/html');
    
});

server.listen(8000);