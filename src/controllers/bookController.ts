import { Router, Request, Response } from 'express';
import { Request as TediousRequest, TYPES } from 'tedious';
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
        const bookId: number = parseInt(req.params.id);
        const selectQuery: string = 'SELECT * FROM dbo.BOOK WHERE id = @id';
        let book: Book = null;

        const selectRequest = new TediousRequest(selectQuery, (error) => {
            if (error) {
                console.log(
                    `Error getting book with id = ${bookId}. Error message ${error}`,
                );
                return res.status(500).json({
                    error: `Database SELECT * FROM BOOK WHERE id = ${bookId} failed!`,
                });
            }
        });

        selectRequest.addParameter('id', TYPES.Int, bookId);

        selectRequest.on('row', (columns) => {
            const bookData = {};
            columns.forEach((column) => {
                bookData[column.metadata.colName] = column.value;
            });

            book = new Book(
                bookData['id'],
                bookData['title'],
                bookData['isbn'],
                bookData['num_copies'],
            );

            res.json(book);
        });

        selectRequest.on('requestCompleted', () => {
            if (book === null)
                res.status(404).json({
                    error: 'not_found',
                    error_description: `Book with id = ${bookId} does not exist`,
                });
        });

        connection.execSql(selectRequest);
    }

    getAllBooks(req: Request, res: Response) {
        const books: Book[] = [];
        const selectQuery: string = 'SELECT * FROM dbo.BOOK';

        const selectRequest = new TediousRequest(selectQuery, (error) => {
            if (error) {
                console.log(`Error getting all books. Error message ${error}`);
                return res
                    .status(500)
                    .json({ error: 'Database SELECT * FROM BOOK failed!' });
            }
        });

        selectRequest.on('row', (columns) => {
            const bookData = {};
            columns.forEach((column) => {
                bookData[column.metadata.colName] = column.value;
            });

            const book: Book = new Book(
                bookData['id'],
                bookData['title'],
                bookData['isbn'],
                bookData['num_copies'],
            );

            books.push(book);
        });

        selectRequest.on('requestCompleted', () => {
            return res.json(books);
        });

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
