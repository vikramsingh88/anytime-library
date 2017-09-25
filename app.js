let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let passport = require('passport');
let mongoose = require('mongoose');
let path = require('path');

let config = require('./config/database');
let users = require('./routes/users');
let books = require('./routes/books');
let review = require('./routes/books-review');

let app = express();
const PORT = process.env.PORT || 8080;

//Setting mongodb
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Mongo db is connected');
});
mongoose.connection.on('err', () => {
    console.log('Error in connecting mongo db');
})

//cors middleware
app.use(cors());

//set static public folder
app.use(express.static(path.join(__dirname, 'public')));

//set body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//cron job to check if book assigned to user is passed the expiry date and still not returned
require('./config/cron-job')();

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//user middleware
app.use('/users', users);

//book middleware
app.use('/books', books);

//review middleware
app.use('/review', review);

//root end point
app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});


//Starting node server
app.listen(PORT, ()=> {
    console.log('Server is running at port ', PORT);
});