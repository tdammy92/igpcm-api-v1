const express = require("express");
const { getAllExams, uploadExams, deleteExams } = require("../../controllers");
const examRouter = express.Router();
const verifyToken = require("../../middleware/verify");
// console.log(Register);

//get exams
examRouter.get("/", getAllExams);

//Ppost exams
examRouter.post("/upload", verifyToken, uploadExams);

//delete exams
examRouter.delete("/:id", verifyToken, deleteExams);

module.exports = examRouter;
