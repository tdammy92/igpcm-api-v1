const express = require("express");
const studentRouter = express.Router();

const verifyToken = require('../../middleware/verify');
// const {uploadImage} = require('../../middleware/ImageUpload')

const {getAllStudent,studentRegistration,deleteStudent} = require('../../controllers')


    //get all student route
    studentRouter.get("/",verifyToken,getAllStudent);


//resgister student route
// studentRouter.post("/",verifyToken,uploadImage, studentRegistration);
studentRouter.post("/", studentRegistration);



//delete student route by id route
studentRouter.delete("/:id",verifyToken, deleteStudent);

module.exports = studentRouter;