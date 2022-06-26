require('dotenv').config()

const express = require("express");
const server = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const {adminRouter,studentRouter} = require('./api/routes');

require('./api/Database/DB')

server.use(cors())
server.use(morgan('tiny'))
server.use(bodyParser.urlencoded({limit:'50mb', extended: false }))
server.use(express.json({ limit: '50mb' }));

// server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


server.get("/api", (req, res) => {
	res.send("welocme to igpcm api/v1");
 
});



 
server.use("/api/student",studentRouter)
server.use("/api/auth",adminRouter)




server.listen(port, () => {
	console.log(`server runing on port http://localhost:${port}/api`);
});
