import * as http from 'http';
import app from './app';

const proxy = http.createServer(app);

proxy.listen(8081, () => {
    console.log("server start at port 8081. Code Typescript");
});