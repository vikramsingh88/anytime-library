export class MyBook {
    public bookTitle : string;
    public bookAuther : string;
    public bookISBN : string;
    public issueDate : string;
    public expiryDate : string;

    constructor(bookTitle : string, 
        bookAuther : string, 
        bookISBN : string, 
        issueDate : string, 
        expiryDate : string) {
        this.bookTitle = bookTitle;
        this.bookAuther = bookAuther;
        this.bookISBN = bookISBN;
        this.issueDate = issueDate;
        this.expiryDate = expiryDate;
    }
}