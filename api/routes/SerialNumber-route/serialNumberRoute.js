const express = require("express");
const serialNumberRouter = express.Router();

const verifyToken = require("../../middleware/verify");

const {
	getAllserialNumber,
	generateSerialNumber,
	getTotalSerialNumberCount,
	updateSerialNumber,
	validateSerialNumber
} = require("../../controllers");

//get all student route
serialNumberRouter.get("/", verifyToken, getAllserialNumber);
serialNumberRouter.get("/count", verifyToken, getTotalSerialNumberCount);
serialNumberRouter.get("/validate", validateSerialNumber);
//resgister student route
// serialNumberRouter.post("/",verifyToken,uploadImage, studentRegistration);
serialNumberRouter.post("/generate", verifyToken, generateSerialNumber);

//delete student route by id route
serialNumberRouter.post("/:id", verifyToken, updateSerialNumber);

module.exports = serialNumberRouter;
