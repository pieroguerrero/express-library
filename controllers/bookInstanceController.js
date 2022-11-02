// Display list of all BookInstances.

import BookInstance from "../models/bookinstance.js";

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
const bookinstance_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance create GET");
};

// Handle BookInstance create on POST.
const bookinstance_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance create POST");
};

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
