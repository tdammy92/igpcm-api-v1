const express = require("express");
const {
  getResult,
  getResults,
  UploadResult,
  deleteResult,
} = require("../../controllers");
const resultRouter = express.Router();
const verifyToken = require("../../middleware/verify");

//get all  results
resultRouter.get("/", verifyToken, getResults);

//get one results
resultRouter.get("/:id", verifyToken, getResult);

//get result by Id
resultRouter.post("/upload", UploadResult);

//delete result by Id
resultRouter.delete("/:id", verifyToken, deleteResult);

module.exports = resultRouter;
