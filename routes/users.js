/* eslint-disable no-unused-vars */
import { Router } from "express";
var router = Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/cool", function (req, res, next) {
  res.send("You're so cool");
});

export default router;
