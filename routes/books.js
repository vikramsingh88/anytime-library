let express = require('express');
let router = express.Router();
let passport = require('passport');

let Book = require('../models/book');
let BookUser = require('../models/book_user');

//Add new books api
router.post('/addbook', passport.authenticate('jwt', {'session' : false}), (req, res) => {
    //check if user is admin
    if(req.user.admin === 'false') {
        return res.json({'success' : false, msg : 'Do not have access to add new book'});
    }
    let newBook = new Book({
        'bookTitle' : req.body.bookTitle,
        'bookAuther' : req.body.bookAuther,
        'bookISBN' : req.body.bookISBN,
        'bookQuantity' : req.body.bookQuantity,
        'description' : req.body.description,
        'genre' : req.body.genre
    });

    Book.addBook(newBook, (err, book) => {
        if(err) {
            res.json({'success' : false, msg : 'Failed to create new book'});
        } else {
            res.json({'success' : true, msg : 'New book added'});
        }
    });
});

//update book quantity
router.post('/updatebookquantity', passport.authenticate('jwt', {'session' : false}), (req, res) => {
    //check if user is admin
    if(req.user.admin === 'false') {
        return res.json({'success' : false, msg : 'Do not have access to update book'});
    }
    Book.updateBookQuantity(req.body.bookQuantity, req.body.bookISBN, (err, book) => {
        if(err) {
            res.json({'success' : false, msg : 'Failed to update book quantity'});
        } else {
            res.json({'success' : true, msg : 'Book quantity updated'});
        }
    });
});

//Delete book api
router.post('/deleteByIsbn', passport.authenticate('jwt', {'session' : false}), (req, res) => {
    //check if user is admin
    if(req.user.admin === 'false') {
        return res.json({'success' : false, msg : 'Do not have access to delete book'});
    }
    Book.deleteBookByIsbn(req.body.bookISBN, (err) => {
        if(err) {
            res.json({'success' : false, msg : 'Failed to delete book'});
        } else {
            res.json({'success' : true, msg : 'Book delete successfully'});
        }
    });
});

//List all the books api
router.get('/books', passport.authenticate('jwt', {'session' : false}), (req, res) => {
    Book.getAllBooks((err, books) => {
        if(err) {
            res.json({'success' : false, msg : 'Failed to retrieve book'});
        } else {
            res.json({'success' : true, msg : 'success', 'books' : books});
        }
    })
});

//Search book by techonoly, bussiness, fiction and management
router.post('/searchbook', passport.authenticate('jwt', {'session' : false}), (req, res) => {
    let searchBy = req.body.searchBy;
    let searchKey = req.body.searchKey;
    Book.searchBook(searchBy, searchKey, (err, books) => {
        if(err) {
            res.json({'success' : false, msg : 'Failed to retrieve book'});
        } else {
            res.json({'success' : true, msg : 'success', 'books' : books});
        }
    });
});

//Issue book api
router.post('/issuebook', passport.authenticate('jwt', {'session' : false}), (req, res) => {
    let newBook = new BookUser({
        'bookISBN' : req.body.bookISBN,
        'userId' : req.user.id,
        'quantity' : req.body.bookQuantity
    });

    BookUser.issueBook(newBook, (err, assignedBook) => {
        if(err) {
            console.log(err);
            res.json({'success' : false, msg : 'Failed to issue book'});
        } else {
            if(assignedBook === null) {
                res.json({'success' : false, msg : 'Failed to issue book'});
            } else {
                //update book quantity
                Book.decreaseBookQuantity(newBook.bookISBN, newBook.quantity, (err, updated) => {
                    if(err) throw err;
                    res.json({'success' : true, msg : 'book issueed'});
                });                
            }            
        }
    });
});

//Return book app
router.post('/returnbook', passport.authenticate('jwt', {'session' : false}), (req, res) => {
    bookISBN = req.body.bookISBN;
    userId = req.user.id;
    BookUser.returnBook(userId, bookISBN, (err, result) => {
        if(err) {
            res.json({'success' : false, msg : 'Failed to return book'});
        } else {
            res.json({'success' : true, msg : 'Book returned successfully'});
        }
    });
});

//Get all bookes assigned to user api
router.get('/assignedbooktouser', passport.authenticate('jwt', {'session' : false}), (req, res) => {
    BookUser.getBooksByUserId(req.user.id, (err, books) => {
        if(err) {
            res.json({'success' : false, msg : 'Failed to retrieve book'});
        } else {
            res.json({'success' : true, msg : 'success', 'books' : books});
        }
    });
});

//Get all books assigned to all users
router.get('/assignedbooks', passport.authenticate('jwt', {'session' : false}), (req, res) => {
    //check if user is admin
    if(req.user.admin === 'false') {
        return res.json({'success' : false, msg : 'Do not have access to this api'});
    }
    BookUser.getAllAssignedBooks((err, books) => {
        if(err) {
            res.json({'success' : false, msg : 'Failed to retrieve book'});
        } else {
            res.json({'success' : true, msg : 'success', 'books' : books});
        }
    });
});

//Get book details by isbn
router.post('/getbookdetailsbyisbn', passport.authenticate('jwt', {'session' : false}), (req, res) => {
    Book.getBookDetailsByIsbn(req.body.bookISBN, (err, book) => {
        if(err) {
            res.json({'success' : false, msg : 'Failed to retrieve book'});
        } else {
            res.json({'success' : true, msg : 'success', 'book' : book});
        }
    });
});


module.exports = router;