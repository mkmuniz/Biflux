import http from 'http';
import app from './app';

let server = http.createServer(app);

require('dotenv').config();
const port = process.env.PORT;

server.listen(port, () => {
    console.log(`Server is listening at localhost:${port}`);
});