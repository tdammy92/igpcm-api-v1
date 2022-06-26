const express = require("express");
const adminRouter = express.Router();


const {Login,Register} = require('../../controllers')

// console.log(Register);

//Login routes
adminRouter.post("/login",Login );


//Register routes
adminRouter.post("/register",Register);

module.exports = adminRouter;