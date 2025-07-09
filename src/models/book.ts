export class Book {
    id: number;
    title: string;
    isbn: string;
    numberCopies: number;

    constructor(id: number, title: string, isbn: string, numberCopies: number) {
        this.id = id;
        this.title = title;
        this.isbn = isbn;
        this.numberCopies = numberCopies;
    }
}
