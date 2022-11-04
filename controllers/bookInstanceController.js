import { body, validationResult } from "express-validator";
import BookInstance from "../models/bookinstance.js";
import Book from "../models/book.js";

// Display list of all BookInstances.
const bookinstance_list = (req, res, next) => {
  const findPromise = BookInstance.find().populate("book").exec();

  findPromise
    .then((result) => {
      res.render("bookinstance_list", {
        title: "Book Instance List",
        bookinstance_list: result,
      });
    })
    .catch((error) => next(error));
};

// Display detail page for a specific BookInstance.
const bookinstance_detail = (req, res, next) => {
  const bookInstancePromise = BookInstance.findById(req.params.id)
    .populate("book")
    .exec();

  bookInstancePromise
    .then((bookInstance) => {
      if (!bookInstance) {
        const err = new Error("Book copy not found");
        return next(err);
      }

      res.render("bookinstance_detail", {
        // @ts-ignore
        title: `Copy: ${bookInstance.book.title}`,
        bookinstance: bookInstance,
      });
    })
    .catch((error) => next(error));
};

// Display BookInstance create form on GET.
const bookinstance_create_get = (req, res, next) => {
  Book.find({}, "title")
    .exec()
    .then((books) => {
      res.render("bookinstance_form", {
        title: "Create BookInstance",
        book_list: books,
      });
    })
    .catch((err) => next(err));
};

// Handle BookInstance create on POST.
const bookinstance_create_post = [
  // Validate and sanitize fields.
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    const bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if (!errors.isEmpty) {
      // There are errors. Render form again with sanitized values and error messages.

      Book.find({}, "title")
        .exec()
        .then((books) => {
          res.render("bookinstance_form", {
            title: "Create BookInstance",
            book_list: books,
            selected_book: bookinstance.book._id,
            errors: errors.array(),
            bookinstance,
          });
        })
        .catch((err) => next(err));

      return;
    }

    bookinstance
      .save()
      .then(() => {
        // @ts-ignore
        res.redirect(bookinstance.url);
      })
      .catch((err) => next(err));
  },
];

// Display BookInstance delete form on GET.
const bookinstance_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
};

// Handle BookInstance delete on POST.
const bookinstance_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
};

// Display BookInstance update form on GET.
const bookinstance_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
};

// Handle bookinstance update on POST.
const bookinstance_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
};

export {
  bookinstance_list,
  bookinstance_detail,
  bookinstance_create_get,
  bookinstance_create_post,
  bookinstance_delete_get,
  bookinstance_delete_post,
  bookinstance_update_get,
  bookinstance_update_post,
};
