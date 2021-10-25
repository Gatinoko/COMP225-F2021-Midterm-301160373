// Modules required for routing.
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {

  // Find all books in the books collection.
  book.find( (err, books) => {

    // If error.
    if (err) {
      return console.error(err);
    }

    // If no error occurs.
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book.
router.get('/add', (req, res, next) => {
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/details', {
        title: 'Books',
        books: ' '
      });
    }
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  
  // New book model.
  let newBook = book({
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  });

  // Creates a new book object in the database.
  book.create(newBook, (err) => {
  
    // If error.
    if (err) {
      return console.error(err);
    }

    // If no error occurs.
    else {
      res.redirect('/books');
    }
  })
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  
  // Respective book's id.
  let id = req.params.id;
  
  // Finds a specific book through its id.
  book.findById(id, (err, bookToEdit) => {

    // If error.
    if (err) {
      return console.error(err);
    }

    // If no error occurs.
    else {
      res.render('books/details', {title: 'Edit', books: bookToEdit})
    }
  })
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  // Respective book's id.
  let id = req.params.id;

  let updatedInformation = book({
    _id: id,
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  });

  book.update({_id: id}, updatedInformation, (err) => {

    // If error.
    if (err) {
      return console.error(err);
    }

    // If no error occurs.
    else {
      res.redirect('/books');
    }
  })

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  
  // Respective book's id.
  let id = req.params.id;

  book.remove({_id: id}, (err) => {

    // If error.
    if (err) {
      return console.error(err);
    }

    // If no error occurs.
    else {
      res.redirect('/books');
    }
  })
});

module.exports = router;
