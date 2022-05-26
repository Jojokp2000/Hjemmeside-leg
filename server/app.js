const http = require('http');
const fs = require('fs');

const PORT = 3000;

// Somehow create a server
let server = http.createServer(requesthandler)

function requesthandler(req, res) {
    try {
        processRequest(req, res);
    } catch (error) {
        console.log(`Internal error !!!!!!!!!! Error is: ${error}`);
        res.statusCode=500;
        res.setHeader('Content-Type', 'text/txt');
        res.write('Something went wrong with the server');
        res.end("\n");
    }
}


function processRequest (req, res) {    
    let path = req.url;
    
    if (path ==='/style.css' || path === '/stick-bugged-small.gif') {
        path = '/frontPage' + path;
    } 
    else if (path === '/' ){
        path = '/frontPage' + '/index.html';
    }
    console.log(path);

    const extension = path.split('.').pop();
    
    fs.readFile('publicResources' + path, (error, data) => {
        if (error) {
            res.writeHead(404)
            res.write('File not found haha')
        }
        else {
            switch (extension) {
                case 'html':
                    res.writeHead(200, { 'content-type': 'text/html' })
                    break;
                case 'css':
                    res.writeHead(200, { 'content-type': 'text/css' })
                    break;
                case 'js':
                    res.writeHead(200, { 'content-type': 'application/javascript' })
                    break;
                case 'gif':
                    res.writeHead(200, { 'content-type': 'image/gif' })
                    break;
                default:
                    break;
            }
            res.write(data);
        }
        res.end();
    })
}



server.listen(process.env.PORT || PORT, (error) => {
    if (error) {
        console.log('Something went wrong');
    }
    console.log(`Server running on port ${PORT}`);
})