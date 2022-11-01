import Author from "../models/author.js";

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
  res.send("NOT IMPLEMENTED: Author create GET");
};

// Display detail page for a specific Author.
const author_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
};

// Handle Author create on POST.
const author_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author create POST");
};

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
