const express = require("express");
const { getAllExams, uploadExams, deleteExams } = require("../../controllers");
const examRouter = express.Router();

// console.log(Register);

//get exams
examRouter.get("/", getAllExams);

//Ppost exams
examRouter.post("/upload", uploadExams);

//delete exams
examRouter.delete("/:id", deleteExams);

module.exports = examRouter;
