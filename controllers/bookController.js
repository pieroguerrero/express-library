import { body, validationResult } from "express-validator";

import Book from "../models/book.js";
import Author from "../models/author.js";
import BookInstance from "../models/bookinstance.js";
import Genre from "../models/genre.js";

const index = (req, res) => {
  //res.send("NOT IMPLEMENTED: Site Home Page");

  const allPromises = Promise.all([
    Book.countDocuments({}).exec(),
    BookInstance.countDocuments({}).exec(),
    BookInstance.countDocuments({ status: "Available" }).exec(),
    Author.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
  ]);

  allPromises
    .then((responses) => {
      res.render("index", {
        title: "Local Library Home",
        error: null,
        data: {
          // @ts-ignore
          book_count: responses[0],
          // @ts-ignore
          book_instance_count: responses[1],
          // @ts-ignore
          book_instance_available_count: responses[2],
          // @ts-ignore
          author_count: responses[3],
          // @ts-ignore
          genre_count: responses[4],
        },
      });
    })
    .catch((error) => {
      res.render("index", {
        title: "Local Library Home",
        error: error,
        data: {},
      });
    });
};

// Display list of all books.
const book_list = (req, res, next) => {
  const findPromise = Book.find({}, "title author")
    .sort({ title: 1 })
    .populate("author")
    .exec();

  findPromise
    .then((result) => {
      res.render("book_list", { title: "Book List", book_list: result });
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
};

// Display detail page for a specific book.
const book_detail = (req, res, next) => {
  const findBookPromise = Book.findById(req.params.id)
    .populate("author")
    .populate("genre")
    .exec();

  findBookPromise
    .then((bookResult) => {
      if (!bookResult) {
        const err = new Error("Book not found");
        return next(err);
      }

      const findBookInstancePromise = BookInstance.find({
        book: req.params.id,
      }).exec();

      findBookInstancePromise
        .then((bookInstanceResult) => {
          res.render("book_detail", {
            title: bookResult.title,
            book: bookResult,
            book_instances: bookInstanceResult,
          });
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
};

// Display book create form on GET.
const book_create_get = (req, res, next) => {
  const bookCreateGetPromise = Promise.all([
    Author.find().exec(),
    Genre.find().exec(),
  ]);

  bookCreateGetPromise
    .then((results) => {
      res.render("book_form", {
        title: "Create Book",
        authors: results[0],
        genres: results[1],
      });
    })
    .catch((err) => next(err));
};

// Handle book create on POST.
const book_create_post = [
  // Convert the genre to an array.
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre =
        typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    next();
  },
  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req); // Create a Book object with escaped and trimmed data.
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
    });

    if (!errors.isEmpty()) {
      const createBookErrorsPromise = Promise.all([
        Author.find().exec(),
        Genre.find().exec(),
      ]);

      createBookErrorsPromise
        .then((results) => {
          const genres = results[1];
          const authors = results[0];

          for (const genre of genres) {
            if (book.genre.includes(genre._id)) {
              // @ts-ignore
              genre.checked = "true";
            }
          }

          res.render("book_form", {
            title: "Create Book",
            authors: authors,
            genres: genres,
            book,
            errors: errors.array(),
          });
        })
        .catch((err) => next(err));

      return;
    }

    book
      .save()
      .then(() => {
        // @ts-ignore
        res.redirect(book.url);
      })
      .catch((err) => next(err));
  },
];

// Display book delete form on GET.
const book_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
};

// Handle book delete on POST.
const book_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
};

// Display book update form on GET.
const book_update_get = (req, res, next) => {
  const updateGetPromise = Promise.all([
    Book.findById(req.params.id).populate("author").populate("genre").exec(),
    Author.find().exec(),
    Genre.find().exec(),
  ]);

  updateGetPromise
    .then((results) => {
      const book = results[0];

      if (!book) {
        // No results.
        const err = new Error("Book not found");
        return next(err);
      }

      const genres = results[2];
      const authors = results[1];

      for (const genre of genres) {
        for (const bookGenre of book.genre) {
          if (genre._id.toString() === bookGenre._id.toString()) {
            // @ts-ignore
            genre.checked = "true";
          }
        }
      }

      res.render("book_form", {
        title: "Update Book",
        authors: authors,
        genres: genres,
        book: book,
      });
    })
    .catch((err) => next(err));
};

// Handle book update on POST.
const book_update_post = [
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre =
        typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    next();
  },
  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped/trimmed data and old id.
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
      _id: req.params.id, //This is required, or a new ID will be assigned!
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      const updatePostPromise = Promise.all([
        Author.find().exec(),
        Genre.find().exec(),
      ]);

      updatePostPromise
        .then((results) => {
          // Mark our selected genres as checked.
          for (const genre of results[1]) {
            if (book.genre.includes(genre._id)) {
              // @ts-ignore
              genre.checked = "true";
            }
          }
          res.render("book_form", {
            title: "Update Book",
            authors: results[0],
            genres: results[1],
            book,
            errors: errors.array(),
          });
        })
        .catch((err) => next(err));

      return;
    }

    Book.updateOne({ _id: book._id }, book)
      .exec()
      .then(() => {
        // @ts-ignore
        res.redirect(book.url);
      })
      .catch((err) => next(err));
  },
];

export {
  index,
  book_list,
  book_detail,
  book_create_get,
  book_create_post,
  book_delete_get,
  book_delete_post,
  book_update_get,
  book_update_post,
};
