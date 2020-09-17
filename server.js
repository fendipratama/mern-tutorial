const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 4000;

app.use(cors());

// bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


// connection
mongoose.connect('mongodb://127.0.0.1:27017/mern-tutorial', {useNewUrlParser : true});
const connection = mongoose.connection;

connection.once('open', function(){
    console.log('MongoDB connection established successfully!!!');
});

// use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);



app.get('/', function(req, res){
    res.send('hello world');
});

app.listen(PORT, function(){
    console.log('server is running on port : ' + PORT);
});

