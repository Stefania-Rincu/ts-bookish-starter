import { Request as TediousRequest, TYPES } from 'tedious';
import { connection } from '../databaseConnection';

export function linkAuthorToBook(
    authorId: number,
    bookId: number,
): Promise<void> {
    return new Promise((resolve, reject) => {
        const insertQuery: string = `INSERT INTO dbo.AUTHOR_BOOK VALUES (@authorId, @bookId); SELECT CAST(SCOPE_IDENTITY() AS INT) AS id;`;

        const insertRequest = new TediousRequest(insertQuery, (error) => {
            if (error) return reject(error);
        });

        insertRequest.addParameter('authorId', TYPES.Int, authorId);
        insertRequest.addParameter('bookId', TYPES.Int, bookId);

        insertRequest.on('requestCompleted', () => {
            resolve();
        });

        connection.execSql(insertRequest);
    });
}
