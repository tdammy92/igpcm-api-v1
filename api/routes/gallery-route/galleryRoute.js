const express = require("express");
const galleryRouter = express.Router();

const verifyToken = require("../../middleware/verify");

const { getAllImages, uploadImage, deleteImage } = require("../../controllers");

//get all student route
galleryRouter.get("/", getAllImages);

//upload image
// galleryRouter.post("/upload", uploadImage);
galleryRouter.post("/upload", verifyToken, uploadImage);

//delete student route by id route
galleryRouter.delete("/:id", verifyToken, deleteImage);

module.exports = galleryRouter;
