let BookUser = require('../models/book_user');

module.exports = function() {
    setInterval(() => {
        BookUser.getAllAssignedBooks((err, books) => {
            books.forEach((book) => {
                let today = new Date();                
                let expiryDate = book.expiryDate;
                if(today.getTime() === expiryDate.getTime()) {
                    BookUser.returnBook(book.userId, book.bookISBN, (err, result) => {
                        if(err) {

                        } else {

                        }
                    });
                } else {
                    console.log('not same');
                }
            });            
        });
    }, 24*60*60*1000);
}