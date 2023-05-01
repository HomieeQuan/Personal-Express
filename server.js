const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');
const fs = require('fs');

var db, collection;

const url = "mongodb+srv://TaQuan:apple123@moviequotes.boakip4.mongodb.net/?retryWrites=true&w=majority";
const dbName = "Movies";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  db.collection('ratings').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('index.ejs', {movies: result});
  });
});

app.post('/movie', upload.single('image'), (req, res) => {
  console.log(req.body.movieName.rating);

  db.collection('ratings').insertOne({movieName: req.body.movieName, rating: req.body.rating}, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/'); 
  });

  // save the file to server

});




