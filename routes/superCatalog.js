import { Router } from "express";
import {
  index,
  book_list,
  book_detail,
  book_create_get,
  book_create_post,
  book_delete_get,
  book_delete_post,
  book_update_get,
  book_update_post,
} from "../controllers/bookController.js";

import {
  author_list,
  author_create_get,
  author_update_post,
  author_update_get,
  author_delete_post,
  author_delete_get,
  author_create_post,
  author_detail,
} from "../controllers/authorController.js";

import {
  genre_list,
  genre_detail,
  genre_create_get,
  genre_create_post,
  genre_delete_get,
  genre_delete_post,
  genre_update_post,
  genre_update_get,
} from "../controllers/genreController.js";

import {
  bookinstance_list,
  bookinstance_detail,
  bookinstance_create_get,
  bookinstance_create_post,
  bookinstance_delete_get,
  bookinstance_delete_post,
  bookinstance_update_get,
  bookinstance_update_post,
} from "../controllers/bookInstanceController.js";

const router = Router();

// GET catalog home page.
router.get("/books", index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/books/create", book_create_get);

// POST request for creating Book.
router.post("/books/create", book_create_post);

// GET request to delete Book.
router.get("/books/:id/delete", book_delete_get);

// POST request to delete Book.
router.post("/books/:id/delete", book_delete_post);

// GET request to update Book.
router.get("/books/:id/update", book_update_get);

// POST request to update Book.
router.post("/books/:id/update", book_update_post);

// GET request for one Book.
router.get("/books/:id", book_detail);

// GET request for list of all Book items.
router.get("/books/all", book_list);

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get("/authors/create", author_create_get);

// POST request for creating Author.
router.post("/author/create", author_create_post);

// GET request to delete Author.
router.get("/author/:id/delete", author_delete_get);

// POST request to delete Author.
router.post("/author/:id/delete", author_delete_post);

// GET request to update Author.
router.get("/author/:id/update", author_update_get);

// POST request to update Author.
router.post("/author/:id/update", author_update_post);

// GET request for one Author.
router.get("/author/:id", author_detail);

// GET request for list of all Authors.
router.get("/author/all", author_list);

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get("/genre/create", genre_create_get);

//POST request for creating Genre.
router.post("/genre/create", genre_create_post);

// GET request to delete Genre.
router.get("/genre/:id/delete", genre_delete_get);

// POST request to delete Genre.
router.post("/genre/:id/delete", genre_delete_post);

// GET request to update Genre.
router.get("/genre/:id/update", genre_update_get);

// POST request to update Genre.
router.post("/genre/:id/update", genre_update_post);

// GET request for one Genre.
router.get("/genre/:id", genre_detail);

// GET request for list of all Genre.
router.get("/genre/all", genre_list);

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get("/bookinstance/create", bookinstance_create_get);

// POST request for creating BookInstance.
router.post("/bookinstance/create", bookinstance_create_post);

// GET request to delete BookInstance.
router.get("/bookinstance/:id/delete", bookinstance_delete_get);

// POST request to delete BookInstance.
router.post("/bookinstance/:id/delete", bookinstance_delete_post);

// GET request to update BookInstance.
router.get("/bookinstance/:id/update", bookinstance_update_get);

// POST request to update BookInstance.
router.post("/bookinstance/:id/update", bookinstance_update_post);

// GET request for one BookInstance.
router.get("/bookinstance/:id", bookinstance_detail);

// GET request for list of all BookInstance.
router.get("/bookinstance/all", bookinstance_list);

export { router };
