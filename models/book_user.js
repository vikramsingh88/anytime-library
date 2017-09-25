let mongoose = require('mongoose');
let dateformat = require('dateformat');
let Book = require('./book');

//Book User schema
const BookUserSchema = mongoose.Schema({
    'bookISBN' : { type : String, required : true},
    'userId' : {type : String, required : true},
    'quantity' : {type : Number, required : true},
    'issueDate' : {type : Date, required : true},
    'expiryDate' : {type : Date, required : true}
});

const BookUser = module.exports = mongoose.model('BookUser', BookUserSchema);

//Issue book
module.exports.issueBook = function(newBook, callback) {
    //get the issue date 
    let now = new Date();
    let issueDate = now;
    now = new Date();
    now.setDate(now.getDate()+7);
    let expiryDate = now;
    
    newBook.issueDate = issueDate;
    newBook.expiryDate = expiryDate;
    //Ask for book quantity
    Book.getBookQuantity(newBook.bookISBN, (err, quantity) => {
        if(err) {
            return callback(err, null)
        } else {
            const avaliableBookQuantity = quantity.bookQuantity;
            const askedBookQuantity = newBook.quantity;  
            //check if enough book is available          
            if(avaliableBookQuantity < askedBookQuantity) {                             
                return callback(err, null)
            } else { 
                //issuebook
                newBook.save(callback);
            }
        }
    });
}

//return book
module.exports.returnBook = function(userId, bookISBN, callback) {
    let query = { 'userId': userId, 'bookISBN' : bookISBN };
    BookUser.remove(query, function(err) {
        if (err) {
            return callback(err, null);
        }
        else {
            //Ask for book quantity and then add one book
            Book.getBookQuantity(bookISBN, (err, quantity) => {
                if(err) {
                    return callback(err, null)
                } else {
                    let avaliableBookQuantity = quantity.bookQuantity;
                    avaliableBookQuantity = avaliableBookQuantity+1;
                    Book.updateBookQuantity(avaliableBookQuantity, bookISBN, (err, result) => {
                        if(err) {
                            return callback(err, null);
                        } else {
                            return callback(err, result)
                        }
                    });
                }
            });
        }
    });
}

//All books assigned to user
module.exports.getBooksByUserId = function(userId, callback) {
    const query = {'userId' : userId};
    BookUser.find(query, callback);
}

//Get all books assigned to all Users
module.exports.getAllAssignedBooks = function(callback) {
    BookUser.find(callback);
}