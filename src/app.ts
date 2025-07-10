import express from 'express';
import 'dotenv/config';

import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';
import { connection } from './databaseConnection';

const port = process.env['PORT'] || 3000;

connection.on('connect', (err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Successfully connected to the database.');
    }
});

connection.connect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});

/**
 * Primary app routes.
 */
app.use('/healthcheck', healthcheckRoutes);
app.use('/books', bookRoutes);
