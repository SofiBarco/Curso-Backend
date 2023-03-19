const http = require('http');

const server = http.createServer((request, response) => {
    response.end('Mi segundo hola mundo desde backend!');
});

server.listen(8080, () => {
    console.log('Listening on port 8080');
})