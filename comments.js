// Create web server application

// Import modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/comment');

// Create schema
var commentSchema = mongoose.Schema({
  name: String,
  comment: String
});

// Create model
var Comment = mongoose.model('Comment', commentSchema);

// Configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set static file directory
app.use(express.static(__dirname + '/public'));

// Set view engine
app.set('view engine', 'ejs');

// Set routes
app.get('/', function(req, res) {
  Comment.find(function(err, data) {
    if (err) throw err;
    res.render('index', { comments: data });
  });
});

app.post('/', function(req, res) {
  var newComment = new Comment({
    name: req.body.name,
    comment: req.body.comment
  });

  newComment.save(function(err) {
    if (err) throw err;
    res.redirect('/');
  });
});

// Start server
app.listen(3000, function() {
  console.log('Server is running on port 3000');
});