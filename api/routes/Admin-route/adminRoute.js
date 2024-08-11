const express = require("express");
const adminRouter = express.Router();


const {getCounts} = require('../../controllers');
const verifyToken = require("../../middleware/verify");

//get all admin counts
adminRouter.get("/count",verifyToken,getCounts);


//Register routes

module.exports = adminRouter;