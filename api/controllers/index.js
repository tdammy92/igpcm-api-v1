const {Login,Register} = require('./Admin-controller/adminController');

const  {
    getAllStudent,studentRegistration,deleteStudent
}  = require("./student-controller/studentController");




module.exports = {
    Login,Register, getAllStudent,studentRegistration,deleteStudent
}