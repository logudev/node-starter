const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    // Build file path
    const filePath = path.join(__dirname, 'public', (req.url === '/' ? 'index.html' : req.url));

    // Extension of file
    const extension = path.extname(filePath);

    // Initial content type
    let contentType = 'text/html';

    switch(extension) {
        case '.js': 
            contentType = 'text/javascript';
            break;
        case '.css': 
            contentType = 'text/css';
            break;
        case '.json': 
            contentType = 'application/json';
            break;
        case '.jpg': 
            contentType = 'image/jpg';
            break;
        case '.png': 
            contentType = 'image/png';
            break;
    }

    console.log(filePath);

    // Read file

    fs.readFile(path.join(filePath), (err, content) => {
        if(err) {
            if(err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(content, 'utf8')
                });
            }
            else {
                res.writeHead(500);
                res.write('<h3>Server Error</h3>');
            }
        }
        else {
            res.writeHead(200, { 'Content-Type': contentType});
            res.end(content, 'utf8')
        }
    })


    // if(req.url === '/') {
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
    //         if(err) throw err;
    //         res.writeHead(200, { 'Content-Type': 'text/html' });
    //         res.end(content)
    //     });
    // }

    // if(req.url === '/api/users') {
    //    const users = [
    //        {id: '123', name: 'Logu'},
    //        {id: '456', name: 'Raja'}
    //    ];
    //    res.writeHead(200, {'Content-Type': 'application/json'});
    //    res.end(JSON.stringify(users));
    // }

    
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log('Server running on port '+ PORT));