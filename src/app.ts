require('dotenv').config();
import express, { Express, Response } from 'express';
const bodyParser = require('body-parser');
import { AppDataSource } from './utils/data.source';
import cors from 'cors';
import morgan from 'morgan';

import userRouter from './routes/user.routes';

AppDataSource
    .initialize()
    .then(async () => {

        const app: Express = express();

        // TEMPLATE ENGINE
        // app.set('view engine', 'pug');
        // app.set('views', `${__dirname}/views`);

        // Body parser
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true, }));

        // Limit body
        // app.use(express.json({ limit: '10kb' }));

        // Cors
        // app.use(cors({ origin: '*', credentials: true }));

        console.log('process.env.NODE_ENV', process.env.NODE_ENV)
        if (process.env.NODE_ENV === 'development') {
            app.use(morgan(':method :url :status :response-time ms'));
        }

        // HEALTH CHECKER
        app.get('/api/healthCheck', async (_, res: Response) => {
            res.status(200).json({ message: 'App Working!' });
        });

        // Routes
        app.use('/api/v1/users', userRouter);

        const port = process.env.PORT || 8080;
        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        });
    });
