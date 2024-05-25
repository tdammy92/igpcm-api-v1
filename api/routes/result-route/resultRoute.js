const express = require("express");
const {
  getAllResults,
  getResultById,
  UploadResult,
  deleteResultById,
} = require("../../controllers");
const resultRouter = express.Router();
const verifyToken = require("../../middleware/verify");

//get all  results
resultRouter.get("/", verifyToken, getAllResults);

//get one results
resultRouter.get("/:id", verifyToken, getResultById);

//post/submit result by Id
resultRouter.post("/upload", UploadResult);

//delete result by Id
resultRouter.delete("/:id", verifyToken, deleteResultById);

module.exports = resultRouter;
