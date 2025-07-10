import { Request as TediousRequest, TYPES } from 'tedious';
import { connection } from '../databaseConnection';
import { Book } from '../models/book';

export class BookService {
    getBookById(id: number): Promise<Book> {
        return new Promise((resolve, reject) => {
            const selectQuery: string = 'SELECT * FROM dbo.BOOK WHERE id = @id';
            const selectRequest = new TediousRequest(selectQuery, (err) => {
                if (err) return reject(err);
            });

            selectRequest.addParameter('id', TYPES.Int, id);

            let book: Book = null;

            selectRequest.on('row', (columns) => {
                const bookData: any = {};
                columns.forEach((column) => {
                    bookData[column.metadata.colName] = column.value;
                });

                book = new Book(
                    bookData.id,
                    bookData.title,
                    bookData.isbn,
                    bookData.num_copies,
                );
            });

            selectRequest.on('requestCompleted', () => {
                if (book) resolve(book);
                else reject(new Error(`Book with id ${id} not found`));
            });

            connection.execSql(selectRequest);
        });
    }

    getAllBooks(): Promise<Book[]> {
        return new Promise((resolve, reject) => {
            const selectQuery: string = 'SELECT * FROM dbo.BOOK';
            const selectRequest = new TediousRequest(selectQuery, (err) => {
                if (err) return reject(err);
            });

            const books: Book[] = [];

            selectRequest.on('row', (columns) => {
                const bookData: any = {};
                columns.forEach((column) => {
                    bookData[column.metadata.colName] = column.value;
                });
                books.push(
                    new Book(
                        bookData.id,
                        bookData.title,
                        bookData.isbn,
                        bookData.num_copies,
                    ),
                );
            });

            selectRequest.on('requestCompleted', () => {
                resolve(books);
            });

            connection.execSql(selectRequest);
        });
    }

    insertBook(
        title: string,
        isbn: string,
        num_copies: number,
    ): Promise<number> {
        return new Promise((resolve, reject) => {
            const insertQuery = `
                INSERT INTO dbo.BOOK (title, isbn, num_copies) VALUES (@title, @isbn, @num_copies);
                SELECT CAST(SCOPE_IDENTITY() AS INT) AS id;
              `;
            const insertRequest = new TediousRequest(insertQuery, (err) => {
                if (err) return reject(err);
            });

            insertRequest.addParameter('title', TYPES.NVarChar, title);
            insertRequest.addParameter('isbn', TYPES.NVarChar, isbn);
            insertRequest.addParameter('num_copies', TYPES.Int, num_copies);

            let insertedId: number = null;

            insertRequest.on('row', (columns) => {
                insertedId = columns[0].value;
            });

            insertRequest.on('requestCompleted', () => {
                if (insertedId !== null) resolve(insertedId);
                else reject(new Error('Failed to retrieve inserted book ID'));
            });

            connection.execSql(insertRequest);
        });
    }
}
