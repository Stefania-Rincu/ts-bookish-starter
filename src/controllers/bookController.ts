import { Router, Request, Response } from 'express';
import { Request as TediousRequest } from 'tedious';
import { Book } from '../models/book';
import { connection } from '../databaseConnection';

class BookController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/:id', this.getBook.bind(this));
        this.router.get('/', this.getAllBooks.bind(this));

        this.router.post('/', this.createBook.bind(this));
    }

    getBook(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }

    getAllBooks(req: Request, res: Response) {
        const books: Book[] = [];
        const selectQuery: string = 'SELECT * FROM BOOKS';

        const selectRequest = new TediousRequest(
            selectQuery,
            (error, rowCount) => {
                try {
                    console.log(rowCount);
                } catch (error) {
                    console.log(error);
                }
            },
        );

        connection.execSql(selectRequest);
    }

    createBook(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }
}

export default new BookController().router;
