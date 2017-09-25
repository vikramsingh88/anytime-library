let mongoose = require('mongoose');

//Book review schema
const BookReviewSchema = mongoose.Schema({
    'bookISBN' : { type : String, required : true},
    'userId' : {type : String, required : true},
    'userName' : {type : String, required : true},
    'rating' : {type : String, required : true},
    'comments' : {type : String, required : true},
    'date' : {type : Date, required : true}
});

const BookReview = module.exports = mongoose.model('BookReview', BookReviewSchema);

//review book
module.exports.reviewBook = function(newComment, callback) {
    //get the issue date 
    let now = new Date();    
    newComment.date = now;
    //save book review comments
    newComment.save(callback);
}

//All books assigned to user
module.exports.getBookReviewByISBN = function(bookISBN, callback) {
    const query = {'bookISBN' : bookISBN};
    BookReview.find(query, callback);
}