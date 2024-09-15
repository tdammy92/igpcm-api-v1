const express = require("express");
const {
  getAllCertificate,
  createCertificate,
deleteCertificateById
} = require("../../controllers");

const certficateRouter = express.Router();


const verifyToken = require("../../middleware/verify");

//get all  results
certficateRouter.get("/",verifyToken, getAllCertificate);

//get one results
// certficateRouter.get("/:id", getCourseById);

//post/submit result by Id
certficateRouter.post("/create", createCertificate);

//delete result by Id
certficateRouter.delete("/:id", verifyToken, deleteCertificateById);

module.exports = certficateRouter;