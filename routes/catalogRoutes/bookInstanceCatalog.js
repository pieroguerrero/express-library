import { Router } from "express";
import {
  bookinstance_list,
  bookinstance_detail,
  bookinstance_create_get,
  bookinstance_create_post,
  bookinstance_delete_get,
  bookinstance_delete_post,
  bookinstance_update_get,
  bookinstance_update_post,
} from "../../controllers/bookInstanceController.js";

const router = Router();

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get("/create", bookinstance_create_get);

// POST request for creating BookInstance.
router.post("/create", bookinstance_create_post);

// GET request to delete BookInstance.
router.get("/:id/delete", bookinstance_delete_get);

// POST request to delete BookInstance.
router.post("/:id/delete", bookinstance_delete_post);

// GET request to update BookInstance.
router.get("/:id/update", bookinstance_update_get);

// POST request to update BookInstance.
router.post("/:id/update", bookinstance_update_post);

// GET request for one BookInstance.
router.get("/:id", bookinstance_detail);

// GET request for list of all BookInstance.
router.get("/all", bookinstance_list);

export { router as bookInstanceCatalogRouter };
