export class Book {
    public bookTitle : string;
    public bookAuther : string;
    public bookISBN : string;
    public bookQuantity : string;
    public description : string;
    public id : string;
    public genre : string;

    constructor(bookTitle : string, 
        bookAuther : string, 
        bookISBN : string, 
        bookQuantity : string, 
        description : string,
        id : string) {
        this.bookTitle = bookTitle;
        this.bookAuther = bookAuther;
        this.bookISBN = bookISBN;
        this.bookQuantity = bookQuantity;
        this.description = description;
        this.id = id;
    }
}