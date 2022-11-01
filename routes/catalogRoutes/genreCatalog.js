import { Router } from "express";

import {
  genre_list,
  genre_detail,
  genre_create_get,
  genre_create_post,
  genre_delete_get,
  genre_delete_post,
  genre_update_post,
  genre_update_get,
} from "../../controllers/genreController.js";

const router = Router();

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get("/create", genre_create_get);

//POST request for creating Genre.
router.post("/create", genre_create_post);

// GET request to delete Genre.
router.get("/:id/delete", genre_delete_get);

// POST request to delete Genre.
router.post("/:id/delete", genre_delete_post);

// GET request to update Genre.
router.get("/:id/update", genre_update_get);

// POST request to update Genre.
router.post("/:id/update", genre_update_post);

// GET request for list of all Genre.
router.get("/all", genre_list);

// GET request for one Genre.
router.get("/:id", genre_detail);

export { router as genreCatalogRouter };
