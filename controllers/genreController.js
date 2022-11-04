import Genre from "../models/genre.js";
import Book from "../models/book.js";
import { body, validationResult } from "express-validator";

// Display list of all Genre.
const genre_list = (req, res, next) => {
  const findPromise = Genre.find({}, "name")
    .sort([["name", "ascending"]])
    .exec();

  findPromise
    .then((result) => {
      res.render("genre_list", {
        title: "Genre List",
        genre_list: result,
      });
    })
    .catch((error) => next(error));
};

// Display detail page for a specific Genre.
const genre_detail = (req, res, next) => {
  const promiseGroup = Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }).exec(),
  ]);

  promiseGroup
    .then((results) => {
      const genre = results[0];

      if (!genre) {
        const err = new Error("Genre not found");
        return next(err);
      }

      res.render("genre_detail", {
        title: "Genre Detail",
        genre: genre,
        genre_books: results[1],
      });
    })
    .catch((error) => next(error));
};

// Display Genre create form on GET.
const genre_create_get = (req, res) => {
  res.render("genre_form", { title: "Create Genre" });
};

// Handle Genre create on POST.
const genre_create_post = [
  // Validate and sanitize the name field.
  body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("genre_form", {
        title: "Create Genre",
        genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      const findOneGenrePromise = Genre.findOne({ name: req.body.name }).exec();

      findOneGenrePromise
        .then((existingGenre) => {
          // Genre already exists, redirect to its detail page.
          if (existingGenre) {
            // @ts-ignore
            res.redirect(existingGenre.url);
          } else {
            const saveGenrePromise = genre.save();
            saveGenrePromise
              .then(() => {
                // Genre saved. Redirect to genre detail page.
                // @ts-ignore
                res.redirect(genre.url);
              })
              .catch((error) => next(error));
          }
        })
        .catch((error) => next(error));
    }
  },
];

// Display Genre delete form on GET.
const genre_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
};

// Handle Genre delete on POST.
const genre_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
};

// Display Genre update form on GET.
const genre_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
};

// Handle Genre update on POST.
const genre_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
};

export {
  genre_list,
  genre_detail,
  genre_create_get,
  genre_create_post,
  genre_delete_get,
  genre_delete_post,
  genre_update_post,
  genre_update_get,
};
