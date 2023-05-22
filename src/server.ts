import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './routes/user.routes';
import { Logger } from './middlewares/logger';

const PORT = 3000;

const app: express.Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Logger)

// router
const router = new Routes();
router.routes(app);

http.createServer(app).listen(PORT, () => {
    console.log('Server listening on port ' + PORT);

})
