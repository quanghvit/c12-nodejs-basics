import http from 'http';
import url from 'url';
console.log(__dirname, __filename);
http.createServer((req, res) => {

    const router = url.parse(req.url as string).pathname
    const method = req.method;
    const data: any[] = []
    req.on('data', (chunk) => data.push(chunk));
    req.on('end', () => {
        res.write(Buffer.concat(data).toString());
        res.end()
    })
}).listen(9999)
