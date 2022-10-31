/* eslint-disable no-unused-vars */
import { Router } from "express";
var router = Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.redirect("/catalog");
});

export default router;
