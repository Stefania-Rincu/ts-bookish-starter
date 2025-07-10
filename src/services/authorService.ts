import { Request as TediousRequest, TYPES } from 'tedious';
import { connection } from '../databaseConnection';

export class AuthorService {
    public insertAuthor(name: string): Promise<number> {
        return new Promise((resolve, reject) => {
            let id: number = null;
            const insertQuery: string =
                'INSERT INTO dbo.AUTHOR VALUES (@name); SELECT CAST(SCOPE_IDENTITY() AS INT) AS id;';

            const insertRequest = new TediousRequest(insertQuery, (error) => {
                if (error) reject(`Failed to insert author. Error: ${error}`);
            });

            insertRequest.addParameter('name', TYPES.NVarChar, name);

            insertRequest.on('row', (columns) => {
                id = columns[0].id;
            });
            insertRequest.on('requestCompleted', () => {
                if (id != null) resolve(id);
                else reject(`Failed to insert author.`);
            });
            connection.execSql(insertRequest);
        });
    }

    public findOrCreateAuthor(authorName: string): Promise<number> {
        return new Promise((resolve, reject) => {
            let authorId: number = null;

            const selectQuery: string =
                'SELECT id FROM dbo.AUTHOR WHERE author_name = @name';

            const selectRequest = new TediousRequest(selectQuery, (error) => {
                if (error)
                    return reject(
                        `Failed to find author with name ${authorName}. Error: ${error}`,
                    );
            });

            selectRequest.addParameter('name', TYPES.NVarChar, authorName);

            selectRequest.on('row', (columns) => {
                authorId = columns[0].value;
            });

            selectRequest.on('requestCompleted', async () => {
                try {
                    if (authorId != null) resolve(authorId);
                    else {
                        const newId: number = await this.insertAuthor(
                            authorName,
                        );
                        resolve(newId);
                    }
                } catch (error) {
                    reject(
                        `Failed to find author with name ${authorName}. Error: ${error}`,
                    );
                }
            });

            connection.execSql(selectRequest);
        });
    }
}
