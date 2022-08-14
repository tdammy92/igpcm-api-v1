const express = require("express");
const studentRouter = express.Router();

const verifyToken = require("../../middleware/verify");
const verifySerial = require("../../middleware/verifySerial");
// const {uploadImage} = require('../../middleware/ImageUpload')

const {
	getAllStudent,
	getRecentStudent,
    getStudentById,
	studentRegistration,
	deleteStudent,
} = require("../../controllers");

//get all student route
studentRouter.get("/", verifyToken, getAllStudent);

//get recent student route
studentRouter.get("/recent", verifyToken, getRecentStudent);

//get student by id
studentRouter.get("/:id", verifyToken, getStudentById);

//resgister student route
// studentRouter.post("/",verifyToken,uploadImage, studentRegistration);
studentRouter.post("/register", verifySerial, studentRegistration);

//delete student route by id route
studentRouter.delete("/:id", verifyToken, deleteStudent);

module.exports = studentRouter;
