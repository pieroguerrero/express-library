import { body, validationResult } from "express-validator";
import Author from "../models/author.js";
import Book from "../models/book.js";

//Display all authors
const author_list = (req, res, next) => {
  const findPromise = Author.find()
    .sort([["family_name", "ascending"]])
    .exec();

  findPromise
    .then((result) => {
      res.render("author_list", {
        title: "Author List",
        author_list: result,
      });
    })
    .catch((error) => next(error));
};

// Display Author create form on GET.
const author_create_get = (req, res) => {
  res.render("author_form", { title: "Create Author" });
};

// Display detail page for a specific Author.
const author_detail = (req, res, next) => {
  const authorPromise = Author.findById(req.params.id).exec();

  authorPromise
    .then((author) => {
      if (!author) {
        const err = new Error("Author not found");
        return next(err);
      }

      const booksPromise = Book.find({ author: req.params.id }).exec();

      booksPromise
        .then((books) => {
          res.render("author_detail", {
            title: "Author Detail",
            author: author,
            author_books: books,
          });
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
};

// Handle Author create on POST.
const author_create_post = [
  // Validate and sanitize fields.
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("author_form", {
        title: "Create Author",
        author: req.body,
        errors: errors.array(),
      });
      return;
    }
    // Data from form is valid.

    // Create an Author object with escaped and trimmed data.
    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });

    const saveAuthorPomise = author.save();
    saveAuthorPomise
      .then(() => {
        // @ts-ignore
        res.redirect(author.url);
      })
      .catch((error) => next(error));
  },
];

// Display Author delete form on GET.
const author_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete GET");
};

// Handle Author delete on POST.
const author_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
};

// Display Author update form on GET.
const author_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update GET");
};

// Handle Author update on POST.
const author_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update POST");
};

export {
  author_list,
  author_create_get,
  author_update_post,
  author_update_get,
  author_delete_post,
  author_delete_get,
  author_create_post,
  author_detail,
};
