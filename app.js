const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/'){
        res.write(`<!doctype html>
                        <html>
                            <head>
                                <title>Hello World!</title>
                            </head>
                            <body>
                                <form action="/message" method="POST">
                                    <input type="text" name="message">
                                    <button type="submit">Send</button>
                                </form>
                            </body>
                        </html>`);
        return res.end();
    };

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');

        return res.end();
    }
});

server.listen(8000);