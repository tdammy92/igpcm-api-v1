const express = require("express");
const { getAllExams, uploadExams, deleteExams } = require("../../controllers");
const examRouter = express.Router();
const verifyToken = require("../../middleware/verify");
const accessLevel = require("../../middleware/access");
// console.log(Register);

//get exams
examRouter.get("/", getAllExams);

//Ppost exams
examRouter.post("/upload", [verifyToken,accessLevel], uploadExams);

//delete exams
examRouter.delete("/:id", [verifyToken,accessLevel], deleteExams);

module.exports = examRouter;
