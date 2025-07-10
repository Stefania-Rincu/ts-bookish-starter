import { Connection, ConnectionConfiguration } from 'tedious';
import * as dotenv from 'dotenv';
dotenv.config();

const configuration: ConnectionConfiguration = {
    server: process.env.SERVER,
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USERNAME,
            password: process.env.PASSWORD,
        },
    },
    options: {
        database: process.env.DB,
        encrypt: false,
        trustServerCertificate: true,
    },
};

export const connection: Connection = new Connection(configuration);
