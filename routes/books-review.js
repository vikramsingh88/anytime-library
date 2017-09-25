let express = require('express');
let router = express.Router();
let passport = require('passport');

let BookReview = require('../models/book_review');

//Add book review api
router.post('/addreview', passport.authenticate('jwt', {'session' : false}), (req, res) => {
    let newComment = new BookReview({
        'bookISBN' : req.body.bookISBN,
        'userId' : req.user.id,
        'userName' : req.user.name,
        'rating' : req.body.rating,
        'comments' : req.body.comments
    });

    BookReview.reviewBook(newComment, (err, comment) => {
        if(err) {            
            res.json({'success' : false, msg : 'Failed to create new comment'});
        } else {
            res.json({'success' : true, msg : 'New book review added'});
        }
    });
});


//get book review by isbn
router.post('/getreview', passport.authenticate('jwt', {'session' : false}), (req, res) => {
    BookReview.getBookReviewByISBN(req.body.bookISBN, (err, comments) => {
        if(err) {            
            res.json({'success' : false, msg : 'Failed to retrieve comment'});
        } else {            
            res.json({'success' : true, msg : 'success', 'comments' : comments});
        }
    })
});

module.exports = router;