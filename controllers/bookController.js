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
const book_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
};

// Display book create form on GET.
const book_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book create GET");
};

// Handle book create on POST.
const book_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book create POST");
};

// Display book delete form on GET.
const book_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
};

// Handle book delete on POST.
const book_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
};

// Display book update form on GET.
const book_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book update GET");
};

// Handle book update on POST.
const book_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book update POST");
};

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
