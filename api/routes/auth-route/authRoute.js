const express = require("express");
const authRouter = express.Router();


const {Login,Register} = require('../../controllers');

//Login routes
authRouter.post("/login",Login );


//Register routes
authRouter.post("/register",Register);


//Register routes

module.exports = authRouter;