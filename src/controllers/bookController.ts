import { Router, Request, Response } from 'express';
import { Book } from '../models/book';
import { BookService } from '../services/bookService';
import { AuthorService } from '../services/authorService';
import { linkAuthorToBook } from '../services/authorBookService';

const bookService = new BookService();
const authorService = new AuthorService();

class BookController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/:id', this.getBook.bind(this));
        this.router.get('/', this.getAllBooks.bind(this));

        this.router.post('/', this.createBook.bind(this));
    }

    async getBook(req: Request, res: Response) {
        try {
            const bookId: number = parseInt(req.params.id);
            const book: Book = await bookService.getBookById(bookId);

            res.json(book);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to get book. Error: ${error}',
            });
        }
    }

    async getAllBooks(req: Request, res: Response) {
        try {
            const books: Book[] = await bookService.getAllBooks();
            res.json(books);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to get all books. Error: ${error}',
            });
        }
    }

    async createBook(req: Request, res: Response) {
        try {
            const { title, isbn, num_copies, authors } = req.body;
            const bookId: number = await bookService.insertBook(
                title,
                isbn,
                parseInt(num_copies),
            );

            const authorNames: string = authors
                .split(',')
                .map((author: string): string => author.trim());

            for (const authorName of authorNames) {
                const authorId = await authorService.findOrCreateAuthor(
                    authorName,
                );
                await linkAuthorToBook(authorId, bookId);
            }

            return res.status(200).json({
                message: 'Book created successfully.',
                bookId: {
                    id: bookId,
                    title: title,
                    isbn: isbn,
                    num_copies: num_copies,
                },
                authorNames: authorNames,
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to create book. Error: ${error}',
            });
        }
    }
}

export default new BookController().router;
