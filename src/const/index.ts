export const AppConstants = {
    app: {
        nodeEnv: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 's3cr3t',
        expireIn: process.env.JWT_EXPIRES || '1d',
    },
    pg: {
        port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
        host: process.env.DB_HOST || 'localhost',
        db: process.env.DB_NAME || 'postgres',
        user: process.env.DB_USER || 'postgres',
        pass: process.env.DB_PASS || '123456',
    }
};