let mongoose = require('mongoose');

//Book schema

const BookSchema = mongoose.Schema({
    'bookTitle' : {type : String, required : true},
    'bookAuther' : {type : String, required : true},
    'bookISBN' : { type : String, required : true, unique : true},
    'bookQuantity' : {type : Number, required : true},
    'description' : {type : String, required : true},
    'genre' : {type : String, required : true}
});

const Book = module.exports = mongoose.model('Book', BookSchema);

//Add new books
module.exports.addBook = function(newBook, callback) {
    newBook.save(callback);
}

//update book quantity
module.exports.updateBookQuantity = function(quantity, isbn, callback) {
    const query = {'bookISBN' : isbn};
    Book.findOneAndUpdate(query, {'bookQuantity' : quantity}, {upsert : false}, callback);
}

//Get book quantity
module.exports.getBookQuantity = function(isbn, callback) {
    const query = {'bookISBN' : isbn};
    Book.findOne(query, 'bookQuantity', callback );
}

//decrease book quantity by number of assigned
module.exports.decreaseBookQuantity = function(isbn, requestedBookQunatity, callback) {
    Book.getBookQuantity(isbn, (err, quantity) => {
        if(err) throw err;
        let q = quantity.bookQuantity;
        q = q - requestedBookQunatity;

        Book.updateBookQuantity(q, isbn, (err, updated) => {
            if(err) throw err;
            callback(err, updated);
        })
    })
}

//Delete book by isbn
module.exports.deleteBookByIsbn = function(isbn, callback) {
    const query = {'bookISBN' : isbn };
    Book.remove(query, callback);
}

//List all books
module.exports.getAllBooks = function(callback) {
    Book.find(callback);
}

//Search book by genre -  technoloy, business, fiction and management
module.exports.searchBook = function(searchBy, searchKey, callback) {
    let query = {'genre' : searchBy, 'bookTitle': { "$regex": searchKey, "$options": "i" }};
    Book.find(query, callback);
}

//Get book details by isbn
module.exports.getBookDetailsByIsbn = function(isbn, callback) {
    const query = {'bookISBN' : isbn};
    Book.findOne(query, callback);
}