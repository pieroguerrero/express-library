import { Router } from "express";
import { authorCatalogRouter } from "./catalogRoutes/authorCatalog.js";
import { bookCatalogRouter } from "./catalogRoutes/bookCatalog.js";
import { bookInstanceCatalogRouter } from "./catalogRoutes/bookInstanceCatalog.js";
import { genreCatalogRouter } from "./catalogRoutes/genreCatalog.js";

const router = Router();

router.use("/books", bookCatalogRouter);
router.use("/authors", authorCatalogRouter);
router.use("/genres", genreCatalogRouter);
router.use("/bookinstances", bookInstanceCatalogRouter);

export { router as catalogRouter };
