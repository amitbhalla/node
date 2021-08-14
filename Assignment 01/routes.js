const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        console.log('--------> Home Page')
        res.write(`
            <!doctype html>
            <html>
                <head>
                    <title>Home | Project - 02</title>
                </head>
                <body>
                    <h1>Hello and welcome to my 2nd project:</h2>
                    <a href='/users'>Users</a>
                    <h1>Form below</h1>
                    <form action="/create-user" method="POST">
                        <input type="text" name="message">
                        <button type="submit">Submit</submit>
                    </form>
                </body>
            </html>
        `)
        res.end();
        return;
    };
    if (url === '/users') {
        console.log('--------> User Page')
        res.write(`
            <!doctype html>
            <html>
                <head>
                    <title>Users | Project - 02</title>
                </head>
                <body>
                    <h1>Here are some dummy users:</h2>
                    <ul>
                        <li>Amit</li>
                        <li>Chai</li>
                        <li>JOOS</li>
                    </ul>
                </body>
            </html>
        `)
        res.end();
        return;
    };

    if (url === '/create-user' && req.method === "POST") {
        console.log('--------> Create User Page')
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
    
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message)
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });

    };
};

module.exports = {
    handler: requestHandler,
    description: 'This is my 2nd node project.'
};