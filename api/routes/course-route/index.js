const express = require("express");
const {
  getAllCourses,
  getCourseById,
  createCourse,
  deleteCourseById,
  updateCourseName
} = require("../../controllers");
const courseRouter = express.Router();
const verifyToken = require("../../middleware/verify");

//get all  results
courseRouter.get("/", getAllCourses);

//get one results
courseRouter.get("/:id", getCourseById);

//post/submit result by Id
courseRouter.post("/create",verifyToken, createCourse);


//post/submit result by Id
courseRouter.patch("/update-course",verifyToken, updateCourseName);

//delete result by Id
courseRouter.delete("/:id", verifyToken, deleteCourseById);

module.exports = courseRouter;