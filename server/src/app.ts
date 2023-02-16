import express from 'express'
import { Route } from '@core/interfaces'
import mongoose from 'mongoose';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { logger } from '@core/utils';
import { errorMiddleware } from '@core/middleware';

class App {
    public app: express.Application
    public port: string | number;
    public production: boolean;

    constructor(routes: Route[]) {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.production = process.env.NODE_ENV == 'production' ? true : false;

        // Kết nối mongodb
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initalizeRoutes(routes);
        this.initalizelizeErrorMiddleware();
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`Server is listening on Port ${this.port}`);
        })
    }

    private initializeMiddlewares() {
        if (this.production) {
            this.app.use(hpp());
            this.app.use(helmet());
            this.app.use(morgan('combined'));
            this.app.use(cors({ origin: 'quang', credentials: true }))
        }
        else {
            this.app.use(morgan('dev'));
            this.app.use(cors({ origin: true, credentials: true }))
        }
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
    private initalizelizeErrorMiddleware() {
        this.app.use(errorMiddleware);
    }
    private initalizeRoutes(routes: Route[]) {
        routes.forEach((route) => {
            this.app.use('/', route.router)
        })
    }

    private connectToDatabase() {
        mongoose.set("strictQuery", false);
        const connectStringDatabase = process.env.MONGODB_URI;
        if (!connectStringDatabase) {
            logger.error("Không tồn tại Chuỗi kết nối Mongodb");
            return;
        }
        mongoose.connect(connectStringDatabase)
            .then(() => logger.info("Kết nối database mongodb..."))
            .catch((reason) => logger.error(reason));

    }
}

export default App;